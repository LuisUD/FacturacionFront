import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { VentaModel } from '../models/venta.model';
import { map, delay } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class VentasService {

  private url = 'http://facturacionapi.azurewebsites.net';

  constructor( private http: HttpClient ) { }


  crearVenta( venta: VentaModel ) {

    return this.http.post(`${ this.url }/api/ventas/Postventa`, venta)
            .pipe(
              map( (resp: any) => {
                venta.IdVenta = resp.id;
                return venta;
              })
            );

  }

  actualizarVenta( venta: VentaModel ) {

    const ventaTemp = {
      ...venta
    };

    return this.http.put(`${ this.url }/api/ventas/Putventa/${ ventaTemp.IdVenta }`, ventaTemp);


  }

  borrarVenta( id: number ) {

    return this.http.delete(`${ this.url }/api/ventas/Deleteventa/${ id }`);

  }


  getVenta( id: string ) {

    return this.http.get(`${ this.url }/api/ventas/Getventa/${ id }`);

  }

  
  getVentasPorFactura( id: string ) {

    return this.http.get(`${ this.url }/api/ventas/GetVentasPorFactura?id=${ id }`);

  }

  


  getVentas() {
    return this.http.get(`${ this.url }/api/ventas/Getventas`)
            .pipe(
              map( this.crearArreglo ),
              delay(0)
            );
  }

  getVentasReporte(edad:number, fechaInicio:string, fechaFin:string) {
    return this.http.get(`${ this.url }/api/ventas/GetventasReporte?edadventa=${edad}&fechaInicio=${fechaInicio}&fechaFin=${fechaFin}`)
            .pipe(
              map( this.crearArreglo ),
              delay(0)
            );
  }

  private crearArreglo( ventasObj: object ) {

    const ventas: VentaModel[] = [];

    Object.keys( ventasObj ).forEach( key => {

      const obj: VentaModel = ventasObj[key];

      ventas.push( obj );
    });


    return ventas;

  }


}
