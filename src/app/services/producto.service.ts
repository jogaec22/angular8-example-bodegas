import { Injectable } from '@angular/core';

import { Producto } from '../models/producto';
import { Bodega } from '../models/bodega';
import { HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';

import { map, catchError, tap } from 'rxjs/operators';
//import { Observable, throwError } from 'rxjs';
import { Observable } from 'rxjs/internal/observable';
import { Subject } from 'rxjs';

import { Router } from '@angular/router';
	//import { AngularFirestore } from '@angular/fire/firestore';
    //import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, QuerySnapshot } from '@angular/fire/firestore';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {	
	public productos: Observable<Producto[]>;
	public producto: Observable<Producto>;
	private productoColl: AngularFirestoreCollection<Producto>;
	private productoDoc: AngularFirestoreDocument<Producto>;

	constructor(
		private router: Router,
		private afs: AngularFirestore
	){
		this.productoColl = this.afs.collection<Producto>('productos');
    	this.productos = this.productoColl.valueChanges();
	}

	getAll(){
		return this.productos = this.productoColl.snapshotChanges().pipe(
			map(changes => {
				return changes.map(action => {
					const data = action.payload.doc.data() as Producto;					
					data.id = action.payload.doc.id;
					return data;
				});
			}));	
	}

	get(id: string) {
		console.log('gettttt service');
		this.productoDoc = this.afs.doc<Producto>(`productos/${id}`);
	    this.producto = this.productoDoc.snapshotChanges().pipe(map(action => {
	      if(action.payload.exists == false){
	      	console.log('No existe');
	        return null;
	      }else{
	      	console.log('Si existe');
	        const data = action.payload.data() as Producto;
	        data.id = action.payload.id;
	        return data;
	      }
	    }));
	    return this.producto;
	}

	create(producto: Producto){		
		console.log('p services', producto);
		this.productoColl.add( producto);
	}

	update(producto){		
		let id = producto.id;
	    this.productoDoc = this.afs.doc<Producto>(`productos/${id}`);
	    this.productoDoc.update(producto);
	}


	delete(id){
		this.productoDoc = this.afs.doc<Producto>(`productos/${id}`);
    	this.productoDoc.delete(); 
	}

	seteaAsignacionesBodegas(productos: Producto[], bodega: Bodega) : Producto[] {
		return productos.map( (p)=>{      
	      p['seleccionar'] = false;
	      if(!bodega.productos) return p;

	      bodega.productos.forEach( (item) =>{        
	        if (item.id == p.id){
	          p['seleccionar'] = true;
	          return;
	         }
	      });
	      return p;      
	    });
	}
}
