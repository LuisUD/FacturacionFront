import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForm, FormControl, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { map, startWith} from 'rxjs/operators';
import { ProductoModel } from '../../models/producto.model';
import { ProductosService } from '../../services/productos.service';


import Swal from 'sweetalert2';



@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {

  producto: ProductoModel = new ProductoModel();
  anios: number[];


  constructor( private productosService: ProductosService,
               private route: ActivatedRoute ) 
               {              
               }

  ngOnInit() {
  
    const id = this.route.snapshot.paramMap.get('id');


    if ( id !== 'nuevo' ) {

      this.productosService.getProducto( id )
        .subscribe( (resp: ProductoModel) => {
          console.log(resp);
          this.producto = resp;
          this.producto.IdProducto = parseInt(id);
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

    console.log(this.producto);
 

    if ( this.producto.IdProducto ) {
      peticion = this.productosService.actualizarProducto( this.producto );
    } else {
      peticion = this.productosService.crearProducto( this.producto );
    }

    peticion.subscribe( resp => {

      Swal.fire({
        title: this.producto.Nombre,
        text: 'Se actualizó correctamente',
        type: 'success'
      });

    });



  }

}
