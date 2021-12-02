import { Component, Input, OnInit } from '@angular/core';
import { Pedido } from 'src/model/Pedido';
import { Pelicula } from 'src/model/Pelicula';
import { AlertService } from '../_services/alert.service';
import { PedidosService } from '../_services/pedidos.service';
import { RepodbService } from '../_services/repodb.service';


@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {

  pedido : Pelicula[] = [];
  totalPedido: number = 0;
  senPedidoOk: boolean= false;
  pedidoUser: Pedido = {
    pedido:  this.pedido,
    usuario: ''
  };
  

  constructor(
    private repo : RepodbService,
    private pedidoServicio : PedidosService,
    public alert : AlertService
    ) { 
      
    }
    
    ngOnInit(): void {
      this.cargarPedido();
      
  }
  borrarPeli(id: number){
    this.totalPedido -= this.pedido[id].precio;
    this.pedido.splice(id,1);   
    this.pedidoServicio.updatePedido(this.pedido);
    
  }
   async cargarPedido  ()  {
    this.pedido = await this.pedidoServicio.getPedido();
    this.total();
  }

  total(){
    for(let pedidos of this.pedido){       
        this.totalPedido +=pedidos.precio
        console.log(this.totalPedido);
    }   
  }
  confirmarPedido(){
    this.pedidoUser.pedido = this.pedido;
    this.pedidoUser.usuario =  localStorage.getItem('usuario');
    console.log(this.pedidoUser);
    
    this.repo.uploadPedido(this.pedidoUser)
    .subscribe( data => {
      if (data.mensaje){
        console.log(data);
        this.senPedidoOk = true;
        this.alert.openAlert(data.mensaje);
        
      }

    }
    );
  }

}
