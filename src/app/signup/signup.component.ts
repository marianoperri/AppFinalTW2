import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  form: FormGroup | any;
  signupFail : boolean = false;
  message: string  ="Usuario resgistrado correctamente";

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { 
    this.buildForm();
  }

  ngOnInit(): void {
  }
  private buildForm(){
    this.form = this.formBuilder.group({
      nombre: ['', [Validators.required]],
      apellido: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required,Validators.minLength(8)]],
      direccion: ['', [Validators.required]]
    });

  }

  registro(event: Event) {    
    event.preventDefault();
    if (this.form.valid) {
      const value = this.form.value;
      console.log(value); // cuando tengamos la api mandamos los datos en el body del post
      
      this.authService.signup(value)
      .subscribe( data => {
        if(data.usuario){
          localStorage.setItem('usuario', data.usuario);          
          return this.router.navigate(['/login']);
        }else {
          this.signupFail = true;
          return;
        }

      });

    } else {
      this.form.markAllAsTouched();
    }
  }
  
}
