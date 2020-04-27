import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ProductosService } from '../../services/productos.service';
import { ProductoModel } from '../../models/producto.model';
import { FormControl } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-producto-minimos',
  templateUrl: './producto-minimos.component.html',
  styleUrls: ['./producto-minimos.component.css']
})
export class ProductoMinimosComponent implements OnInit {

  productos: ProductoModel[] = [];
  cargando = false;
  fechaInicio: string;
  fechaFin: string;
  PRODUCTO_MINIMO:number = 5; // minimo en inventario
 

  productosFiltrados: Observable<ProductoModel[]>;

  constructor(private productosService: ProductosService) { }

  ngOnInit() {

    this.cargando = true;

    this.productosService.getProductosPorCantidad(this.PRODUCTO_MINIMO)
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
