import { Injectable } from '@angular/core';
import { User } from '../models/User';
import { Router } from '@angular/router'
//import 'rxjs/add/operator/toPromise';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    public db: AngularFirestore,
    public afAuth: AngularFireAuth
   ) { }

  
  setUserLoggedIn(user: User) {
    localStorage.setItem('user', JSON.stringify(user));
    console.log('user', localStorage.getItem('user'));
  }
  
  getUserLoggedIn() {    
    return JSON.parse(localStorage.getItem('user'));
  }

  

  updateUser(userupdate: User){
    console.log('userupdate', userupdate.displayName)    
    return new Promise<any>((resolve, reject) =>{
      var user = firebase.auth().currentUser; 
        user.updateProfile({
          displayName: userupdate.displayName
        }).then(res => {    
          localStorage.setItem('user', JSON.stringify(userupdate));          
          resolve(res);
        }, 
        err => reject(err))
      
    });
  }
 
  clearLocalStorage() {
    localStorage.clear();
  }

  isLoggedIn(): boolean {
      var user: string = localStorage.getItem('user');
      return user && user.length > 0;
  }
}
