import { Pelicula } from "./Pelicula";

export interface Pedido {
    pedido : {peliculas : Pelicula[]},
    usuario: string 
}