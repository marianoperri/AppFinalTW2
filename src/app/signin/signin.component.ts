import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {  Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  form: FormGroup | any;
  logFail : boolean = false;
  user : string = '';
  message : string = '';

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
    
  ) {     
    this.buildForm();
  }

  ngOnInit(): void {
      if(localStorage.getItem("token")){
      this.router.navigate(['inicio'])      
    }
    const user = localStorage.getItem('usuario');
    if(user){      
      console.log(user);      
      this.user = user;
      console.log(this.user);
    }
  }
  
  private buildForm() {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  iniciar(event: Event) {
    event.preventDefault();
    if (this.form.valid) {
      const value = this.form.value;      
      this.authService.login(value)
      .subscribe( data => {
            if(data.token) {
            localStorage.setItem("token", data.token);
            if(!localStorage.getItem('usuario')){
              localStorage.setItem('usuario', value.email);
            }
             this.router.navigate(['inicio']);
             window.location.reload();
          }
          else {
            this.logFail = true;                 
            return;
          }
        });
      } else {
        this.form.markAllAsTouched();
    }
 
  }

}
