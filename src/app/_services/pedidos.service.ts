import { Injectable } from '@angular/core';
import { Pelicula } from 'src/model/Pelicula';

@Injectable({
  providedIn: 'root'
})
export class PedidosService {
  pedido: Pelicula[] = [];
  constructor() { }

  addPeli(pelicula : Pelicula){
    this.pedido.push(pelicula);
    localStorage.setItem('pedido', JSON.stringify(this.pedido));

  }
  cargarPedido():void{
    if(localStorage.getItem('pedido')){
      var pedido = localStorage.getItem('pedido');
      localStorage.setItem('pedido', JSON.stringify(pedido));

    }
  }

  getPedido(){
    if(localStorage.getItem('pedido')){
      var pedido = localStorage.getItem('pedido');
      return pedido ?  JSON.parse(pedido): null;
    }
    return;
  }
  updatePedido(pedido:Pelicula[] ){
    localStorage.setItem('pedido', JSON.stringify(pedido));
  }
    
}
