import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FacturaModel } from '../models/factura.model';
import { map, delay } from 'rxjs/operators';
import { VentaModel } from '../models/venta.model';
import { InputCrearFacturaModel } from '../models/inputCrearFactura.model';


@Injectable({
  providedIn: 'root'
})
export class FacturasService {

  private url = 'http://facturacionapi.azurewebsites.net';

  constructor( private http: HttpClient ) { }


  crearFactura( inputCrearFacturaModel:InputCrearFacturaModel) {

    return this.http.post(`${ this.url }/api/Facturas/PostFactura`, inputCrearFacturaModel)
            .pipe(
              map( (resp: any) => {
                inputCrearFacturaModel.Factura.IdFactura = resp.id;
                return inputCrearFacturaModel.Factura;
              })
            );

  }

  actualizarFactura( factura: FacturaModel ) {

    const facturaTemp = {
      ...factura
    };

    return this.http.put(`${ this.url }/api/Facturas/PutFactura/${ facturaTemp.IdFactura }`, facturaTemp);


  }

  borrarFactura( id: number ) {

    return this.http.delete(`${ this.url }/api/Facturas/DeleteFactura/${ id }`);

  }


  getFactura( id: string ) {

    return this.http.get(`${ this.url }/api/Facturas/GetFactura/${ id }`);

  }


  getFacturas() {
    return this.http.get(`${ this.url }/api/Facturas/GetFacturas`)
            .pipe(
              map( this.crearArreglo ),
              delay(0)
            );
  }

  getFacturasReporte(edad:number, fechaInicio:string, fechaFin:string) {
    return this.http.get(`${ this.url }/api/Facturas/GetFacturasReporte?edadfactura=${edad}&fechaInicio=${fechaInicio}&fechaFin=${fechaFin}`)
            .pipe(
              map( this.crearArreglo ),
              delay(0)
            );
  }

  private crearArreglo( facturasObj: object ) {

    const facturas: FacturaModel[] = [];

    Object.keys( facturasObj ).forEach( key => {

      const obj: FacturaModel = facturasObj[key];

      facturas.push( obj );
    });


    return facturas;

  }


}
