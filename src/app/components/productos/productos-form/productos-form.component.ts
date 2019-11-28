import { Component, OnInit } from '@angular/core';

import { ProductoService } from '../../../services/producto.service';
import { Producto } from '../../../models/producto';
import { FormGroup } from '@angular/forms';

import { ActivatedRoute, Router, Params } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-productos-form',
  templateUrl: './productos-form.component.html',
  styleUrls: ['./productos-form.component.scss'],
  providers: [ ProductoService ]
})
export class ProductosFormComponent implements OnInit {

  private producto: Producto;

  errores: string[];

  constructor(
  	private _productoService : ProductoService,
  	private router: Router,
    private _route: ActivatedRoute
  	) { 
    this.producto = {
      codigo: '',
      nombre: '',
      descripcion : '',
      precio: 0,
      cantidad: 0
    };    
  }

  ngOnInit() {
      this.get();
  }

  create(){
  	console.log(this.producto);
    this._productoService.create(this.producto);      
    swal.fire('Nuevo producto', `El producto ${this.producto.nombre} ha sido creado con éxito`, 'success');
    this.router.navigate(['/productos']);            
  }


  update(){
    console.log(this.producto);
    this._productoService.update(this.producto);
    swal.fire('Nuevo producto', `El producto ${this.producto.nombre} ha sido Actualizado con éxito`, 'success');
    this.router.navigate(['/productos']);  
  }


  get(){
    this._route.params.forEach((params: Params) =>{
      let id = params['id'];      
      if(!id) return;
      this._productoService.get(id).subscribe(producto => {
        console.log('p get', producto);
        this.producto = producto;      
        console.log('p get 2', this.producto);  
      }, bad=>{
        console.error('Error al obtener producto: ', <any>bad);
      });
    });
  }

}
