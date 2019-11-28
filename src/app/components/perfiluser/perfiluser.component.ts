import { Component, OnInit } from '@angular/core';

import { UserService } from '../../services/user.service';
import { User } from '../../models/user';

//import { FormGroup } from '@angular/forms';

import { ActivatedRoute, Router } from '@angular/router';
import swal from 'sweetalert2';


@Component({
  selector: 'app-perfiluser',
  templateUrl: './perfiluser.component.html',
  styleUrls: ['./perfiluser.component.scss'],
  providers: [UserService]
})
export class PerfiluserComponent implements OnInit {

	public user: User;
	private imagenSeleccionada: File;
	public errorMessage;

  constructor(
  	public _userService: UserService,
  ) {   	
  }

  ngOnInit() {
  	this.getUser();
  }

  getUser(){
  	this.user = this._userService.getUserLoggedIn();
  }

  update(){  	
    this._userService.updateUser(this.user).then(res => {
      swal.fire('Sucess', 'Se ha guardado correctamente', 'success');
      this.errorMessage = '';      
    }, err => {
      this.errorMessage = err.message;
      console.log('error en component updateUser',err)
    });
  }

  /*seleccionarImagen(event){
  	this.imagenSeleccionada = event.target.files[0];
    console.log(this.imagenSeleccionada);
    if (this.imagenSeleccionada.type.indexOf('image') < 0) {
      swal('Error seleccionar imagen: ', 'El archivo debe ser del tipo imagen', 'error');
      this.imagenSeleccionada = null;
    }
  }*/



}
