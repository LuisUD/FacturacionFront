import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ProductosService } from '../../services/productos.service';
import { ProductoModel } from '../../models/producto.model';
import { FormControl } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {

  productos: ProductoModel[] = [];
  cargando = false;


  autor = new FormControl();
  categoria = new FormControl();
  nombre = new FormControl();

  fechaInicio: string;
  fechaFin: string;

  productosFiltrados: Observable<ProductoModel[]>;

  constructor(private productosService: ProductosService) { }

  ngOnInit() {

    this.cargando = true;

    this.productosService.getProductos()
      .subscribe(resp => {
        this.productos = resp;
        this.cargando = false;
        this.productosFiltrados = of(resp);
      });

  }


  onFilter(evento: string, value: any) {

    console.log(this.formatDate(new Date(value)));

    if (evento === 'fechaInicio') {
      this.fechaInicio = this.formatDate(new Date(value));
    }

    if (evento === 'fechaFin') {
      this.fechaFin = this.formatDate(new Date(value));
    }

    if (this.fechaInicio && this.fechaFin) {



    }

  }


  filtarproductos(valor: string): ProductoModel[] {
    let productosFiltrados: ProductoModel[] = [];

    console.log(valor);
    console.log(this.productos);

    //productosFiltrados = productosFiltrados.concat(this.productos.filter(option => option.idProducto == valor));

    console.log(productosFiltrados);

    return productosFiltrados;

  }

  borrarProducto(producto: ProductoModel, i: number) {

    Swal.fire({
      title: '¿Está seguro?',
      text: `Está seguro que desea borrar a ${producto.Nombre}`,
      type: 'question',
      showConfirmButton: true,
      showCancelButton: true
    }).then(resp => {

      if (resp.value) {
        this.productos.splice(i, 1);
        this.productosService.borrarProducto(producto.IdProducto).subscribe();
      }

    });



  }

  private formatDate(m) {

    return m.getUTCFullYear() + "-" + (m.getUTCMonth() + 1) + "-" + m.getUTCDate();
  }

}
