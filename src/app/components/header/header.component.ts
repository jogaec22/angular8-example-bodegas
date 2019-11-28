import { Component, OnInit, DoCheck } from '@angular/core';

import { Router } from '@angular/router';
import {AuthService} from '../../services/auth.service';

import { User } from 'firebase';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, DoCheck {
  user: User;

	title: string = 'Gestión de Bodega-Prodcutos'

  constructor(private authService: AuthService, private router: Router) { 
    this.getUserLoggedIn();
  }

  ngOnInit() {
  }

  logout(): void {    
    this.authService.logout();
  }

  getUserLoggedIn() {
    this.user = JSON.parse(localStorage.getItem('user'));
  }  

  ngDoCheck(){
    this.user = JSON.parse(localStorage.getItem('user'));
  }

}
