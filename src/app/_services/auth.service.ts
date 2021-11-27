import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Token } from '../../model/Token';
import { User } from '../../model/User';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  API_ROUTE : string = "http://localhost:3000/";
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  constructor(private http: HttpClient) { }

  login(data:{}): Observable<Token> {
    return this.http.post<Token>(this.API_ROUTE + 'login', 
      data,
      this.httpOptions
    );
  }
  signup(data:{}): Observable<User> {
    return this.http.post<User>(this.API_ROUTE+ 'registro',
     data,
     this.httpOptions);

  }
  logOut():void {
    localStorage.clear();
    window.location.reload();
  }
}
