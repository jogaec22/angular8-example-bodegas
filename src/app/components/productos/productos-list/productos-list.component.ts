import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';

import { ProductoService } from '../../../services/producto.service';
import { Producto } from '../../../models/producto';
import { Bodega } from '../../../models/bodega';

import { ActivatedRoute, Router } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-productos-list',
  templateUrl: './productos-list.component.html',
  styleUrls: ['./productos-list.component.scss'],
  providers: [ ProductoService ]
})
export class ProductosListComponent implements OnInit, OnChanges{

  public productos: Producto[];
  @Input() asignaciones:boolean;    
  @Input() bodega: Bodega;

  @Output() seleccionar = new EventEmitter<any>();  

  constructor(
  	private _productoService : ProductoService,
  	private router: Router,
    private activatedRoute: ActivatedRoute
  	) { }

  ngOnInit() {    
    this.getAll();
  }  

  ngOnChanges(){
     if(!this.productos || !this.bodega){
      return;
    }
    this.productos = this._productoService.seteaAsignacionesBodegas(this.productos, this.bodega);

    let seleccionadosActualmente = {};
    this.productos.forEach( item => {      
      if (item.seleccionar)        
        seleccionadosActualmente[item.codigo] = item;
    });
    this.seleccionar.emit({seleccionadosActualmente: seleccionadosActualmente});
  }  


  getAll(){
    this._productoService.getAll().subscribe(res => {
      this.productos = res;
    }, err =>{
      console.log('error', err)
    });
  }


  delete(producto: Producto): void {
    swal.fire({
      title: 'Está seguro?',
      text: `¿Seguro que desea eliminar el Producto ${producto.nombre} ?`,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'No, cancelar!',
      buttonsStyling: false,
      reverseButtons: true
    }).then((result) => {
      if (result.value) {

        this._productoService.delete(producto.id);
        swal.fire(
              'Producto Eliminado!',
              `Producto ${producto.nombre} eliminado con éxito.`,
              'success'
            );
      }
    });
  }

  selectProducto(producto, evt) {
    producto.seleccionar = evt.target.checked;
    this.seleccionar.emit({producto: producto, seleccionado: evt.target.checked, productos: this.productos});
  }
}
