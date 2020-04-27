import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ClientesService } from '../../services/clientes.service';
import { ClienteModel } from '../../models/cliente.model';
import { FormControl } from '@angular/forms';;
import Swal from 'sweetalert2';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  clientes: ClienteModel[] = [];
  cargando = false;

  anios: number[];

  fechaInicio: string;
  fechaFin: string;
  anio:number;

  clientesFiltrados: Observable<ClienteModel[]>;

  constructor(private clientesService: ClientesService) { }

  ngOnInit() {

    this.anios = Array.from(Array(100).keys());
    console.log(this.anios);

    this.cargando = true;

    this.clientesService.getClientes()
      .subscribe(resp => {
        this.clientes = resp;
        this.cargando = false;
        this.clientesFiltrados = of(resp);
      });

  }


  onFilter(evento: string, value: any) {

    console.log(this.formatDate(new Date(value)));

    if (evento === 'fechaInicio') {
      this.fechaInicio =  this.formatDate(new Date(value)); 
    }

    if (evento === 'fechaFin') {
      this.fechaFin = this.formatDate(new Date(value));
    }

    if(evento === 'anio'){
      this.anio = value;
    }

    if (this.fechaInicio && this.fechaFin && this.anio) {

      this.clientesService.getClientesReporte(this.anio, this.fechaInicio, this.fechaFin)
      .subscribe(resp => {
        this.clientes = resp;
        this.cargando = false;
        this.clientesFiltrados = of(resp);
      });

    }

  }


  filtarClientes(valor: string): ClienteModel[] {
    let clientesFiltrados: ClienteModel[] = [];

    console.log(valor);
    console.log(this.clientes);

    clientesFiltrados = clientesFiltrados.concat(this.clientes.filter(option => option.Identificacion == valor));

    console.log(clientesFiltrados);
    /*
    console.log(this.libros);

    if(idFiltro === 'autor'){
      clientesFiltrados = clientesFiltrados.concat(this.clientes.filter(option => option.idCliente.toLowerCase().includes(filterValue)));
      console.log(filterValue);
    }
    if(idFiltro === 'categoria'){
      clientesFiltrados = clientesFiltrados.concat(this.clientes.filter(option => option.categoriaId.toLowerCase().includes(filterValue)));
    }
    if(idFiltro === 'nombre'){
      clientesFiltrados = clientesFiltrados.concat(this.clientes.filter(option => option.nombre.toLowerCase().includes(filterValue)));
    }
*/
    return clientesFiltrados;

  }

  borrarCliente(cliente: ClienteModel, i: number) {

    Swal.fire({
      title: '¿Está seguro?',
      text: `Está seguro que desea borrar a ${cliente.Nombre}`,
      type: 'question',
      showConfirmButton: true,
      showCancelButton: true
    }).then(resp => {

      if (resp.value) {
        this.clientes.splice(i, 1);
        console.log(cliente.IdCliente);
        this.clientesService.borrarCliente(cliente.IdCliente).subscribe();
      }

    });



  }

  private formatDate(m) {
    
    return m.getUTCFullYear() +"-"+ (m.getUTCMonth()+1) +"-"+ m.getUTCDate();
}

}
