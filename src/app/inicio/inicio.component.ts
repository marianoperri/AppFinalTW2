import { Component, OnInit } from '@angular/core';
import { Pelicula } from 'src/model/Pelicula';
import { PedidosService } from '../_services/pedidos.service';
import { RepodbService } from '../_services/repodb.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  
  peliculas: Pelicula[] = [];
  
  
  constructor(
    private repo : RepodbService,
    private pedidoServicio : PedidosService
    ) { 
    
  }
  
  ngOnInit(): void {
    this.obtenerPeliculas();
    this.pedidoServicio.cargarPedido();
  }

  obtenerPeliculas():void {
    this.repo.getPeliculas().subscribe((value : Pelicula[]) =>{
      this.peliculas = value;
    }, error => console.error(error));

  }
  agregarPelicula(pelicula: Pelicula){
    this.pedidoServicio.addPeli(pelicula);
    return alert("ok");
 }
 
}
