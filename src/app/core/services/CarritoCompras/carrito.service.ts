import { Injectable } from '@angular/core';
import {Compra} from '../../models/Compra';
import {Funcion} from '../../models/Funcion';
import {Detallecompra} from '../../models/Detallecompra';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  private carrito: Compra[] = [];
  private detallecompras: Detallecompra[] = [];

  getCompras(): Compra[] {
    return this.carrito;
  }
  getDetalles(): Detallecompra[] {
    return this.detallecompras;
  }

  agregarCompra(compra: Compra, funcion:Funcion): void {
    const detallecompra:Detallecompra={
      id:0,
      compra:compra,
      funcion:funcion,
    }
    this.detallecompras.push(detallecompra);
    this.carrito.push(compra);
  }
  eliminarCompra(index: number): void {
    this.carrito.splice(index, 1);
    this.detallecompras.splice(index,1)
  }


  limpiarCarrito(): void {
    this.carrito = [];
    this.detallecompras = [];
  }
  constructor() { }
}
