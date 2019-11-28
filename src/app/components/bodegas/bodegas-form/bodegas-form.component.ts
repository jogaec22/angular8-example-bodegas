import { Component, OnInit } from '@angular/core';

import { BodegaService } from '../../../services/bodega.services';
import { Bodega } from '../../../models/bodega';

import { FormGroup } from '@angular/forms';

import { ActivatedRoute, Router, Params } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-bodegas-form',
  templateUrl: './bodegas-form.component.html',
  styleUrls: ['./bodegas-form.component.scss'],
  providers: [ BodegaService ]
})
export class BodegasFormComponent implements OnInit {

  private bodega: Bodega;

  errores: string[];

  constructor(
  	private _bodegaService : BodegaService,
  	private router: Router,
    private _route: ActivatedRoute
  	) { 
    this.bodega = {
      codigo: '',
      nombre: '',
      ciudad: ''
    };    
  }

  ngOnInit() {
    //if(this.producto.id)
      this.get();
  }

  create(){
  	console.log(this.bodega);
    this._bodegaService.create(this.bodega);      
    swal.fire('Nueva Bodega', `La bodega ${this.bodega.nombre} ha sido creada con éxito`, 'success');
    this.router.navigate(['/bodegas']);            
  }


  update(){
    console.log(this.bodega);
    this._bodegaService.update(this.bodega);
    swal.fire('Nuevo Bodega', `La Bodega ${this.bodega.nombre} ha sido Actualizada con éxito`, 'success');
    this.router.navigate(['/bodegas']);  
  }


  get(){
    this._route.params.forEach((params: Params) =>{
      let id = params['id'];      
      if(!id) return;
      this._bodegaService.get(id).subscribe(bodega => {
        this.bodega = bodega;      
      }, bad=>{
        console.error('Error al obtener bodega: ', <any>bad);
      });
    });
  }

}
