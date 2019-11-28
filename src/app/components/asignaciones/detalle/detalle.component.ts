import { Component, OnInit, Input, OnChanges  } from '@angular/core';
import { Bodega } from '../../../models/bodega';
import { ProductoService } from '../../../services/producto.service';
import { Producto } from '../../../models/producto';
import { BodegaService } from '../../../services/bodega.services';
import { ActivatedRoute, Router } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss'],
  providers: [ ProductoService,  BodegaService]
})
export class DetalleComponent implements OnInit, OnChanges {

	@Input() bodega: Bodega;
	@Input() productos: Producto[];

  constructor(
  	private _productoService : ProductoService,
  	private _bodegaService: BodegaService,
  	private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
  	this.productos = [];
   }

  ngOnInit() {  	
  }

  ngOnChanges(){
    this.productos = this.bodega.productos;
  }
}
