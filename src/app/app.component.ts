import { Component, OnInit } from '@angular/core';
import {  Router } from '@angular/router';
import { AuthService } from './_services/auth.service';
 
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isLogIn :  boolean = false;
  user : string = '';
  constructor (
    private router : Router,
    private auth : AuthService
    ) {
      const user = localStorage.getItem('usuario');
    if(localStorage.getItem("token"))
      {
        this.user = user ? user : '';
        this.isLogIn = true;
      }
    else{
      this.router.navigate(['login']);
    }
    }

  ngOnInit(): void {
    if(!this.isLogIn)
    this.router.navigate(['login']);
  }
  title = 'taller2-app';


  Logout():void {
    this.auth.logOut();
  }
}
