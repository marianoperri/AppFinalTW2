import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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


}
