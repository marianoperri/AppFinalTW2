import { Component, OnInit } from '@angular/core';
import { Pelicula } from 'src/model/Pelicula';
import { AlertService } from '../_services/alert.service';
import { PedidosService } from '../_services/pedidos.service';
import { RepodbService } from '../_services/repodb.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  
  peliculas: Pelicula[] = [];
  MENSAJE_PELI_ADD : string = "Se agrego la pelicula: "
  
  
  constructor(
    private repo : RepodbService,
    private pedidoServicio : PedidosService,
    public alert : AlertService
    ) { 
      
    }
    
    ngOnInit(): void {
    this.pedidoServicio.cargarPedido();
    this.obtenerPeliculas();
  }

  obtenerPeliculas():void {
    this.repo.getPeliculas().subscribe((value : Pelicula[]) =>{
      this.peliculas = value;
    }, error => console.error(error));

  }
  agregarPelicula(pelicula: Pelicula){
    this.pedidoServicio.addPeli(pelicula);
    this.alert.openAlertPeli(this.MENSAJE_PELI_ADD + pelicula.title);
 }
 
}
