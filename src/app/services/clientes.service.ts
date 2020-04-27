import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ClienteModel } from '../models/cliente.model';
import { map, delay } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  private url = 'http://facturacionapi.azurewebsites.net';

  constructor( private http: HttpClient ) { }


  crearCliente( cliente: ClienteModel ) {

    return this.http.post(`${ this.url }/api/Clientes/PostCliente`, cliente)
            .pipe(
              map( (resp: any) => {
                cliente.IdCliente = resp.id;
                return cliente;
              })
            );

  }

  actualizarCliente( cliente: ClienteModel ) {

    const clienteTemp = {
      ...cliente
    };

    return this.http.put(`${ this.url }/api/Clientes/PutCliente/${ clienteTemp.IdCliente }`, clienteTemp);


  }

  borrarCliente( id: number ) {

    return this.http.delete(`${ this.url }/api/Clientes/DeleteCliente/${ id }`);

  }


  getCliente( id: string ) {

    return this.http.get(`${ this.url }/api/Clientes/GetCliente/${ id }`);

  }


  getClientes() {
    return this.http.get(`${ this.url }/api/Clientes/GetClientes`)
            .pipe(
              map( this.crearArreglo ),
              delay(0)
            );
  }

  getClientesReporte(edad:number, fechaInicio:string, fechaFin:string) {
    return this.http.get(`${ this.url }/api/Clientes/GetClientesReporte?edadCliente=${edad}&fechaInicio=${fechaInicio}&fechaFin=${fechaFin}`)
            .pipe(
              map( this.crearArreglo ),
              delay(0)
            );
  }

  private crearArreglo( clientesObj: object ) {

    const clientes: ClienteModel[] = [];

    Object.keys( clientesObj ).forEach( key => {

      const obj: ClienteModel = clientesObj[key];

      clientes.push( obj );
    });


    return clientes;

  }


}
