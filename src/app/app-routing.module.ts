import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from "./signin/signin.component";
import { InicioComponent } from "./inicio/inicio.component";
import { CarritoComponent } from './carrito/carrito.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path:'registro' , component: SignupComponent },
  { path:'login', component: SigninComponent },
  { path:'inicio', component: InicioComponent },
  { path:'pedido', component: CarritoComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
