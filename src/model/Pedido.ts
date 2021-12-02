import { Pelicula } from "./Pelicula";

export interface Pedido {
    id? : number,
    pedido : Pelicula[],
    usuario: string | any 
}