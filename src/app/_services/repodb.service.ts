import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pedido } from 'src/model/Pedido';
import { Pelicula } from 'src/model/Pelicula';

@Injectable({
  providedIn: 'root'
})
export class RepodbService {
  API_ROUTE : string = "http://localhost:3000/";
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  constructor(private http: HttpClient) { }

  getPeliculas() : Observable<Pelicula[]> {
    return this.http.get<Pelicula[]>(this.API_ROUTE + 'peliculas', this.httpOptions);

  }
  updatePeliculas(pelicula: Pelicula) : Observable<Pelicula> {
    const id = pelicula.id
    return this.http.put<Pelicula>(this.API_ROUTE +`pelicula/${id}`,
     pelicula,
      this.httpOptions);

  }
  addPeliculas(pelicula: Pelicula) : Observable<Pelicula> {
    return this.http.post<Pelicula>(this.API_ROUTE + `pelicula/add`,
    pelicula,
    this.httpOptions);
  }
  
  delPeliculas(id : number) : Observable<any> {
    return this.http.delete(this.API_ROUTE + `pelicula/delete/${id}`,
    this.httpOptions);
  }
  uploadPedido(pedido : Pedido): Observable<any> {
    let usuario = localStorage.getItem('usuario');
    pedido.usuario = usuario ? usuario :''; 
    return this.http.post<Pedido>(this.API_ROUTE+ 'pedido',
     pedido,
     this.httpOptions );
  } 


}
