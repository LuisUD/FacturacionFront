import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForm, FormControl, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { ClienteModel } from '../../models/cliente.model';
import { ClientesService } from '../../services/clientes.service';


import Swal from 'sweetalert2';



@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {

  cliente: ClienteModel = new ClienteModel();
  anios: number[];





  constructor( private clientesService: ClientesService,
               private route: ActivatedRoute ) 
               {              
               }

  ngOnInit() {

  
    const id = this.route.snapshot.paramMap.get('id');


    if ( id !== 'nuevo' ) {

      this.clientesService.getCliente( id )
        .subscribe( (resp: ClienteModel) => {
          console.log(resp);
          this.cliente = resp;
          this.cliente.IdCliente = parseInt(id);
        });

    }

  }


  guardar( form: NgForm ) {

    if ( form.invalid ) {
      console.log('Formulario no válido');
      return;
    }

    Swal.fire({
      title: 'Espere',
      text: 'Guardando información',
      type: 'info',
      allowOutsideClick: false
    });
    Swal.showLoading();


    let peticion: Observable<any>;

    console.log(this.cliente);
    

  
    //this.cliente.autorId = this.autor.value;
    //this.cliente.categoriaId= this.categoriaControl.value;

    if ( this.cliente.IdCliente ) {
      peticion = this.clientesService.actualizarCliente( this.cliente );
    } else {
      peticion = this.clientesService.crearCliente( this.cliente );
    }

    peticion.subscribe( resp => {

      Swal.fire({
        title: this.cliente.Nombre,
        text: 'Se actualizó correctamente',
        type: 'success'
      });

    });



  }

}
