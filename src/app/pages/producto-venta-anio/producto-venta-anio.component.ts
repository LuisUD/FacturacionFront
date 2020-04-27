import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ProductosService } from '../../services/productos.service';
import { ProductoModel } from '../../models/producto.model';
import Swal from 'sweetalert2';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-producto-venta-anio',
  templateUrl: './producto-venta-anio.component.html',
  styleUrls: ['./producto-venta-anio.component.css']
})
export class ProductoVentaAnioComponent implements OnInit {

  productos: ProductoModel[] = [];
  cargando = false;
  fechaInicio: string;
  fechaFin: string;
  anios:number[];

 
  productosFiltrados: Observable<ProductoModel[]>;

  constructor(private productosService: ProductosService) { }

  ngOnInit() {

    this.cargando = true;
    this.anios = Array.from(Array(100).keys()).map(m => m + 1950);
 
    this.productosService.getTotalVendidoProductoPorAnio(2020)
    .subscribe(resp => {
      this.productos = resp;
      this.cargando = false;
      this.productosFiltrados = of(resp);
    });
  }


  onFilter(value: any) {

    if (value) {

      this.productosService.getTotalVendidoProductoPorAnio(value)
      .subscribe(resp => {
        this.productos = resp;
        this.cargando = false;
        this.productosFiltrados = of(resp);
      });

    }

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

  

}
