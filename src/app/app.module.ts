import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FlexLayoutModule } from "@angular/flex-layout";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from '../model/angular-material.module';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { InicioComponent } from './inicio/inicio.component';
import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';
import { AuthService } from './_services/auth.service';
import { RepodbService } from './_services/repodb.service';
import { CarritoComponent } from './carrito/carrito.component';
import { PedidosService } from './_services/pedidos.service';



@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    SigninComponent,
    InicioComponent,
    CarritoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [ 
    AuthService,
    RepodbService,
    PedidosService 
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
