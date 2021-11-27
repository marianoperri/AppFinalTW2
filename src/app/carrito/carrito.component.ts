import { Component, OnInit } from '@angular/core';
import { Pelicula } from 'src/model/Pelicula';
import { PedidosService } from '../_services/pedidos.service';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {

  pedido : Pelicula[] = [];
  totalPedido: number = 0;
  constructor(
    private pedidoServicio : PedidosService
  ) { 
    
  }

  ngOnInit(): void {
    this.pedido = this.pedidoServicio.getPedido();
    console.log(this.pedido);
    
    this.total();
  }
  borrarPeli(id: number){
    this.pedido.splice(id);
    this.pedidoServicio.updatePedido(this.pedido);
  }

  total(){
    if (this.pedido) {
      for(let pedido of this.pedido){
        this.totalPedido +=pedido.precio
      }
      
    }
  }

}
