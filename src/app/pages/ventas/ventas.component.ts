import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForm, FormControl, Validators, FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { FacturaModel } from '../../models/factura.model';
import { VentaModel } from 'src/app/models/venta.model';
import { FacturasService } from '../../services/facturas.service';

import Swal from 'sweetalert2';
import { ClientesService } from 'src/app/services/clientes.service';
import { ClienteModel } from 'src/app/models/cliente.model';
import { ProductosService } from 'src/app/services/productos.service';
import { ProductoModel } from 'src/app/models/producto.model';
import { InputCrearFacturaModel } from 'src/app/models/inputCrearFactura.model';
import { VentasService } from 'src/app/services/ventas.service';


@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.css']
})
export class VentasComponent implements OnInit {

  factura: FacturaModel;
  ventas: VentaModel[] = [];
  anios: number[];
  clientes: ClienteModel[] = [];
  productosList: ProductoModel[] = [];
  forma: FormGroup;
  view: boolean;

  constructor(private ventasService: VentasService,
    private facturasService: FacturasService,
    private route: ActivatedRoute,
    private fb: FormBuilder) {


  }


  ngOnInit() {

    const id = this.route.snapshot.paramMap.get('id');


    if (id !== 'nuevo') {

      this.view = true;

      this.facturasService.getFactura(id)
      .subscribe((resp: FacturaModel) => {
        console.log(resp);
        this.factura = resp;
        this.factura.IdFactura = parseInt(id);
        this.cargarDataAlFormulario(resp);
      });

      this.ventasService.getVentasPorFactura(id)
        .subscribe((resp: VentaModel[]) => {
          console.log(resp);
          this.ventas = resp;
        });

    }

    this.crearFormulario();
  }


  get productos() {
    return this.forma.get('productos') as FormArray;
  }

  get nombreNoValido() {
    return this.forma.get('nombre').invalid && this.forma.get('nombre').touched
  }


  crearFormulario() {

    this.forma = this.fb.group({
      IdFactura: [],
      NombreCliente: [],
      IdCliente: ['', Validators.required],
      ValorTotal: [],
      Valor: [],
      FechaFacturacion: ['', Validators.required]
    });


  }

  cargarDataAlFormulario(factura: FacturaModel) {

    // this.forma.setValue({
    this.forma.reset(factura);

  }


}
