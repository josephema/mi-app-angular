import { Injectable } from '@angular/core';
import { Producto } from '../models/producto';

@Injectable({
  providedIn: 'root',
})
export class ProductoService {
produtos:Producto[]=[];

obtnerProductos():Producto[]{
  return this.produtos;
}
agregar(producto:Producto):void{
  this.produtos.push(producto);
}
limpiar(): void{this.produtos=[];}

}
