import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';

import { InicioComponent } from './components/inicio/inicio.component';
import { PerfiluserComponent } from './components/perfiluser/perfiluser.component';
import { ProductosListComponent } from './components/productos/productos-list/productos-list.component';
import { ProductosFormComponent } from './components/productos/productos-form/productos-form.component';

import { BodegasListComponent } from './components/bodegas/bodegas-list/bodegas-list.component';
import { BodegasFormComponent } from './components/bodegas/bodegas-form/bodegas-form.component';

import { BodegaproductoComponent } from './components/asignaciones/bodegaproducto/bodegaproducto.component';

import { AuthguardService } from './services/authguard.service';

const appRoutes : Routes = [  
  { path: 'login', component: LoginComponent },  
  {
    path: 'inicio',
    component: InicioComponent,
    canActivate: [AuthguardService]
  },
  {
    path: 'perfiluser',
    component: PerfiluserComponent,
    canActivate: [AuthguardService]
  },
  {
    path: 'productos',
    component: ProductosListComponent,
    canActivate: [AuthguardService]
  },
  {
    path: 'productos/form/:id',
    component: ProductosFormComponent,
    canActivate: [AuthguardService]
  },
  {
    path: 'productos/form',
    component: ProductosFormComponent,
    canActivate: [AuthguardService]
  },  
  {
    path: 'bodegas',
    component: BodegasListComponent,
    canActivate: [AuthguardService]
  },
  {
    path: 'bodegas/form',
    component: BodegasFormComponent,
    canActivate: [AuthguardService]
  },
  {
    path: 'bodegas/form/:id',
    component: BodegasFormComponent,
    canActivate: [AuthguardService]
  },
  {
    path: 'asignaciones',
    component: BodegaproductoComponent,
    canActivate: [AuthguardService]
  },
  { path: '**', redirectTo: 'inicio', pathMatch: 'full'}

];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes)