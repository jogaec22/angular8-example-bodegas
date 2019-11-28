import { Component, OnInit } from '@angular/core';

import { BodegaService } from '../../../services/bodega.services';
import { Bodega } from '../../../models/bodega';
import { Producto } from '../../../models/producto';


@Component({
  selector: 'app-bodegaproducto',
  templateUrl: './bodegaproducto.component.html',
  styleUrls: ['./bodegaproducto.component.scss'],
  providers: [ BodegaService ]
})
export class BodegaproductoComponent implements OnInit {

	public bodegas: Bodega[];
	public selectedBodega: Bodega;
  public productos: Producto[];  

  constructor(
  	private _bodegaService : BodegaService
  ) { 
    this.productos = [];
    this._productos = {};
  }


  ngOnInit() {
  	this.getAll();
  }  

  getAll(){
    this._bodegaService.getAll().subscribe(res => { 
      this.bodegas = res;
    }, err =>{
      console.log('error', err);
    });
  }

  onSelect(bodega: Bodega): void {
    this.selectedBodega = bodega;
  }

  private _productos: any;
  recibeProducto(res){    
    console.log('res', res);
    if(res.seleccionadosActualmente){
      this._productos = res.seleccionadosActualmente;
      return;
    }
    console.log('pass return', this._productos);
    console.log('seleccionado', res.seleccionado);
    if (res.seleccionado)    {
      this._productos[res.producto.codigo] = res.producto
    }
    else
      delete this._productos[res.producto.codigo];
  }

  asignar(){    
    this.productos  = Object.keys(this._productos).map( (i) =>{
      return this._productos[i];
    });
    this.selectedBodega.productos = this.productos;
    this._bodegaService.update(this.selectedBodega, this.productos);    
  }
}