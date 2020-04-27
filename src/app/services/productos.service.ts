import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductoModel } from '../models/producto.model';
import { map, delay } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  private url = 'http://facturacionapi.azurewebsites.net';

  constructor( private http: HttpClient ) { }


  crearProducto( producto: ProductoModel ) {

    return this.http.post(`${ this.url }/api/Productos/Postproducto`, producto)
            .pipe(
              map( (resp: any) => {
                producto.IdProducto = resp.id;
                return producto;
              })
            );

  }

  actualizarProducto( producto: ProductoModel ) {

    const productoTemp = {
      ...producto
    };

    return this.http.put(`${ this.url }/api/Productos/PutProducto/${ productoTemp.IdProducto }`, productoTemp);


  }

  borrarProducto( id: number ) {

    return this.http.delete(`${ this.url }/api/Productos/DeleteProducto/${ id }`);

  }


  getProducto( id: string ) {

    return this.http.get(`${ this.url }/api/Productos/GetProducto/${ id }`);

  }


  getProductos() {
    return this.http.get(`${ this.url }/api/Productos/GetProductos`)
            .pipe(
              map( this.crearArreglo ),
              delay(0)
            );
  }

  getProductosPorCantidad(cantidad:number) {
    return this.http.get(`${ this.url }/api/Productos/ProductosCantidad?cantidad=${cantidad}`)
            .pipe(
              map( this.crearArreglo ),
              delay(0)
            );
  }

  getTotalVendidoProductoPorAnio(anio:number) {
    return this.http.get(`${ this.url }/api/Productos/ProductosPorAnio?anio=${anio}`)
            .pipe(
              map( this.crearArreglo ),
              delay(0)
            );
  }

  
  getProductosReporte(edad:number, fechaInicio:string, fechaFin:string) {
    return this.http.get(`${ this.url }/api/Productos/GetProductosReporte?edadproducto=${edad}&fechaInicio=${fechaInicio}&fechaFin=${fechaFin}`)
            .pipe(
              map( this.crearArreglo ),
              delay(0)
            );
  }

  private crearArreglo( productosObj: object ) {

    const productos: ProductoModel[] = [];

    Object.keys( productosObj ).forEach( key => {

      const obj: ProductoModel = productosObj[key];

      productos.push( obj );
    });


    return productos;

  }


}
