import { Injectable } from '@angular/core';

import { Bodega } from '../models/bodega';

import { map, catchError, tap } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

import { Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, QuerySnapshot } from '@angular/fire/firestore';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class BodegaService {

	public bodegas: Observable<Bodega[]>;
	public bodega: Observable<Bodega>;
	private bodegaColl: AngularFirestoreCollection<Bodega>;
	private bodegaDoc: AngularFirestoreDocument<Bodega>;

	constructor(
		private router: Router,
		private afs: AngularFirestore
	){
		this.bodegaColl = this.afs.collection<Bodega>('bodega');
    	this.bodegas = this.bodegaColl.valueChanges();
	}

	getAll(){
		return this.bodegas = this.bodegaColl.snapshotChanges().pipe(
			map(changes => {
				return changes.map(action => {
					const data = action.payload.doc.data() as Bodega;					
					data.id = action.payload.doc.id;					
					return data;
				});
			}));	
	}

	get(id: string) {		
		this.bodegaDoc = this.afs.doc<Bodega>(`bodega/${id}`);
	    this.bodega = this.bodegaDoc.snapshotChanges().pipe(map(action => {
	      if(action.payload.exists == false){
	        return null;
	      }else{
	        const data = action.payload.data() as Bodega;
	        data.id = action.payload.id;
	        return data;
	      }
	    }));
	    return this.bodega;
	}

	create(bodega: Bodega){				
		this.bodegaColl.add( bodega);
	}

	update(bodega: Bodega, productos?){		
		let id = bodega.id;
		if(productos){			
			bodega.productos = productos;
		}
	    this.bodegaDoc = this.afs.doc<Bodega>(`bodega/${id}`);
	    this.bodegaDoc.update(bodega);
	}


	delete(id){
		this.bodegaDoc = this.afs.doc<Bodega>(`bodega/${id}`);
    	this.bodegaDoc.delete(); 
	}	
}