import { Component, OnInit } from '@angular/core';

import { BodegaService } from '../../../services/bodega.services';
import { Bodega } from '../../../models/bodega';

import { ActivatedRoute, Router } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-bodegas-list',
  templateUrl: './bodegas-list.component.html',
  styleUrls: ['./bodegas-list.component.scss'],
  providers: [ BodegaService ]
})
export class BodegasListComponent implements OnInit {

	bodegas: Bodega[];

  constructor(
  	private _bodegaService : BodegaService,
  	private router: Router,
  ) { }

  ngOnInit() {
  	this.getAll();
  }

  getAll(){
    this._bodegaService.getAll().subscribe(res => {      
      this.bodegas = res;
    }, err =>{
      console.log('error', err)
    });
  }

  delete(bodega: Bodega): void {
    swal.fire({
      title: 'Está seguro?',
      text: `¿Seguro que desea eliminar el Bodega ${bodega.nombre} ?`,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'No, cancelar!',            
      buttonsStyling: false,
      reverseButtons: true
    }).then((result) => {
      if (result.value) {

        this._bodegaService.delete(bodega.id);
        swal.fire(
              'Bodega Eliminada!',
              `Bodega ${bodega.nombre} eliminado con éxito.`,
              'success'
            );
      }
    });
  }

}
