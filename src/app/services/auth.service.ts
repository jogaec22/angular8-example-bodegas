import { Injectable, NgZone } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { Router } from '@angular/router';
import { User } from '../models/User';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: User;  

  constructor(
    private ngZone: NgZone,
    public afAuth: AngularFireAuth,
    private router: Router,
    public userservice: UserService
  ) {
    this.checkLocalStorage();
  }


  checkLocalStorage() {
    if (!localStorage.getItem('user')) {
      this.getDataFromFirebase();
    } else {
      console.log('localStorage ready!');
    }
  }
  
  getDataFromFirebase() {
    this.afAuth.authState.subscribe(auth => {
      if (auth) {
        this.user = auth;
        console.log('Authenticated');
        this.userservice.setUserLoggedIn(this.user);
      } else {
        console.log('Not authenticated');
      }
    });
  }  


  loginWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    this.afAuth.auth
      .signInWithPopup(provider)
      .then(data => {
        this.ngZone.run(() => this.router.navigate(['/inicio'])).then();
      })
      .catch(error => {
        console.log(error);
      });      
  }  


  logout() {
    this.userservice.clearLocalStorage();
    this.afAuth.auth.signOut().then(() => {
      this.router.navigate(['/login']);
    });
  }

  doLogin(value){
    return new Promise<any>((resolve, reject) => {
      firebase.auth().signInWithEmailAndPassword(value.email, value.password)
      .then(res => {
        resolve(res);
      }, err => {
        console.log('err doLogin', err)
        if (err.code.includes('invalid-email'))
          err.message = 'La dirección de correo electrónico está mal formateada.';
        if (err.code.includes('wrong-password'))
          err.message = 'La contraseña es inválida.';
        if (err.code.includes('user-not-found'))
          err.message = 'Correo electrónico no registrado.';        
        reject(err)
      })
    })
  }  

  doRegister(value){
      return new Promise<any>((resolve, reject) => {
        firebase.auth().createUserWithEmailAndPassword(value.email, value.password)
        .then(res => {
          resolve(res);
        }, err => {
            if (err.code.includes('invalid-email'))
              err.message = 'La dirección de correo electrónico está mal formateada.';
            if (err.code.includes('email-already-in-use'))
              err.message = 'La dirección de correo electrónico ya está en uso por otra cuenta.';
            if (err.code.includes('weak-password'))
              err.message = 'La contraseña debe tener al menos 6 caracteres.';
            
            reject(err)
        })
      })
  }


  
}
