import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { routing, appRoutingProviders } from './app.routing';


// Firebase
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFirestore } from '@angular/fire/firestore'
import { environment } from '../environments/environment';
import { AngularFireDatabaseModule } from '@angular/fire/database';


import { AuthguardService } from './services/authguard.service';

import { LoginComponent } from './components/login/login.component';
import { PerfiluserComponent } from './components/perfiluser/perfiluser.component';
import { ProductosListComponent } from './components/productos/productos-list/productos-list.component';
import { ProductosFormComponent } from './components/productos/productos-form/productos-form.component';
import { BodegasListComponent } from './components/bodegas/bodegas-list/bodegas-list.component';
import { BodegasFormComponent } from './components/bodegas/bodegas-form/bodegas-form.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';


import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BodegaproductoComponent } from './components/asignaciones/bodegaproducto/bodegaproducto.component';
import { DetalleComponent } from './components/asignaciones/detalle/detalle.component';
/*import { MatTableModule } from '@angular/material/table';
import { MatDatepickerModule } from '@angular/material';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';*/

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PerfiluserComponent,
    ProductosListComponent,
    ProductosFormComponent,
    BodegasListComponent,
    BodegasFormComponent,
    InicioComponent,
    HeaderComponent,
    FooterComponent,
    BodegaproductoComponent,
    DetalleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    routing,    
    FormsModule,
    BrowserAnimationsModule, //MatDatepickerModule, MatMomentDateModule,
    ReactiveFormsModule, //, //MatAutocompleteModule, MatInputModule, MatFormFieldModule,     

    //MatTableModule
    AngularFireModule.initializeApp(environment.firebase),    
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    AngularFireAuthModule,    
  ],
  providers: [appRoutingProviders, AngularFirestore],
  bootstrap: [AppComponent]
})
export class AppModule { }
