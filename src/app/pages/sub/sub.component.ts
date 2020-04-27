import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ProductosService } from 'src/app/services/productos.service';
import { ProductoModel } from 'src/app/models/producto.model';

@Component({
  selector: 'app-sub',
  templateUrl: './sub.component.html'
})
export class SubComponent {

  @Input() myForm: FormGroup; // This component is passed a FormGroup from the base component template

  productos:ProductoModel[] = [];

  constructor(private productosService: ProductosService) {


    this.productosService.getProductos()
    .subscribe(resp => {
      this.productos = resp;
    });

  }
}