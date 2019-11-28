import { Component, OnInit } from '@angular/core';
import { AuthService } from './../../services/auth.service';
import { Router } from '@angular/router';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public errorMessage: string;
  public registerForm: FormGroup;
  loginForm: FormGroup;
  successMessage: string = '';

  constructor(private authservice: AuthService, private router: Router,
    private fb: FormBuilder) 
  {
    this.loginForm = this.fb.group({
      email: ['', Validators.required ],
      password: ['',Validators.required]
    });

    this.registerForm = this.fb.group({
       email: ['', Validators.required ],
       password: ['',Validators.required],
       confirmPassword: ['',Validators.required]
    });
  }  

  ngOnInit() {    
    if (localStorage.getItem('user')) {
      this.router.navigate(['/inicio']);
    }
  }  


  loginWithGoogle() {
    this.authservice.loginWithGoogle();
  }

  tryLogin(value){
      this.authservice.doLogin(value)
      .then(res => {
        this.router.navigate(['/inicio']);
      }, err => {
        console.log(err);
        this.errorMessage = err.message;
      })
  }


  tryRegister(value){
    console.log('value es', value);
    if (value.password !== value.confirmPassword ){
      this.errorMessage = 'La contraseña y la confirmación deben ser iguales';      
      return;
    }
    this.authservice.doRegister(value).then(res => {
      console.log(res);
      this.errorMessage = "";
      //this.successMessage = "Se ha registrado correctamente, ya puede ingresar";
      this.registerForm.reset();
      this.router.navigate(['/inicio']);
    }, err => {
      console.log(err);
      this.errorMessage = err.message;
      this.successMessage = "";      
    })
  }

}
