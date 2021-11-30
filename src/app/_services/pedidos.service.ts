import { Injectable } from '@angular/core';
import { Pelicula } from 'src/model/Pelicula';

@Injectable({
  providedIn: 'root'
})
export class PedidosService {
  pedido: Pelicula[] = [];
  constructor() {
  
   }

  addPeli(pelicula : Pelicula){
      this.pedido.push(pelicula);
      localStorage.setItem('pedido', JSON.stringify(this.pedido));
  }
  cargarPedido():void{
    if(localStorage.getItem('pedido')){
      let pedidoStorage = localStorage.getItem('pedido');
      this.pedido = pedidoStorage ? JSON.parse(pedidoStorage): '';
      localStorage.setItem('pedido', JSON.stringify(this.pedido));
    } else {      
      localStorage.setItem('pedido', JSON.stringify(this.pedido));
    }
  }

  getPedido(){
    if(localStorage.getItem('pedido')){
      var pedido = localStorage.getItem('pedido');
      return pedido ?  JSON.parse(pedido): [];
    } else {
      return [];
    }
  }
  updatePedido(pedido:Pelicula[] ){
    localStorage.setItem('pedido', JSON.stringify(pedido));
    console.log("pase por aca");    
  }
    
}
