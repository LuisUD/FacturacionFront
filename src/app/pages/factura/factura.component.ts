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


@Component({
  selector: 'app-factura',
  templateUrl: './factura.component.html',
  styleUrls: ['./factura.component.css']
})
export class FacturaComponent implements OnInit {

  factura: FacturaModel;
  ventas: VentaModel[] = [];
  anios: number[];
  clientes: ClienteModel[] = [];
  productosList: ProductoModel[] = [];
  forma: FormGroup;
  view: boolean;

  constructor(private facturasService: FacturasService,
    private clientesService: ClientesService,
    private productosService: ProductosService,
    private route: ActivatedRoute,
    private fb: FormBuilder) {


  }

  ngOnInit() {

    const id = this.route.snapshot.paramMap.get('id');

    this.clientesService.getClientes()
      .subscribe(resp => {
        console.log(resp);
        this.clientes = resp;
        console.log(this.clientes);
      });

    this.productosService.getProductos()
      .subscribe(resp => {
        this.productosList = resp;
      });

    if (id !== 'nuevo') {

      this.view = true;

      this.facturasService.getFactura(id)
        .subscribe((resp: FacturaModel) => {
          console.log(resp);
          this.factura = resp;
          this.factura.IdFactura = parseInt(id);
          this.cargarDataAlFormulario(resp);
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
      IdCliente: ['', Validators.required],
      ValorTotal: [],
      Valor: [],
      FechaFacturacion: ['', Validators.required],
      productos: this.fb.array([])
    });


  }

  cargarDataAlFormulario(factura: FacturaModel) {

    // this.forma.setValue({
    this.forma.reset(factura);

  }



  agregarProducto() {

    let newGroup = this.fb.group({
      producto: ['', [Validators.required]],
      cantidad: ['', [Validators.required]]
    });

    this.productos.push(newGroup);

  }

  borrarProducto(i: number) {
    this.productos.removeAt(i);
    this.productos.get('').value
  }


  guardar() {
    console.log(this.forma);

    if (this.forma.invalid || this.productos.length == 0) {

      console.log('formulario invalido');

      return Object.values(this.forma.controls).forEach(control => {

        if (control instanceof FormGroup) {
          Object.values(control.controls).forEach(control => control.markAsTouched());
        } else {
          control.markAsTouched();
        }

      });

    }

    this.calcularValorFactura();

    let ventasArr: VentaModel[] = this.calcularValorFactura();
    let facturaObj: FacturaModel = new FacturaModel(
      this.forma.get('IdCliente').value
      , this.forma.get('Valor').value
      , this.forma.get('ValorTotal').value
      , this.forma.get('FechaFacturacion').value
    );

    Swal.fire({
      title: 'Espere',
      text: 'Guardando información',
      type: 'info',
      allowOutsideClick: false
    });
    Swal.showLoading();

    this.facturasService.crearFactura(new InputCrearFacturaModel(facturaObj, ventasArr)).subscribe(
      res => {
        Swal.hideLoading();
        this.forma.reset({});
      }
    );

  }


  calcularValorFactura() {

    let arrayVentas: VentaModel[] = [];
    let sum: number = 0;
    let sumTotal: number = 0;
    let sumrPrecios: number = 0;

    if (this.productos.length != 0) {

      Object.values(this.productos.controls).forEach(productGroup => {

        if (productGroup instanceof FormGroup) {


          let cantidad = productGroup.controls['cantidad'].value;
          let IdProducto = productGroup.controls['producto'].value;

          let producto = this.productosList.find(p => p.IdProducto == IdProducto);

          let iva = (producto.Precio * cantidad) * producto.IVA;
          sumrPrecios += (producto.Precio * cantidad);
          let precioTotal = (producto.Precio * cantidad) + iva;

          arrayVentas.push(new VentaModel(IdProducto, producto.Nombre, cantidad, producto.Precio, precioTotal));

        }
      });
      sumTotal = arrayVentas.reduce((sum, current) => sum + (current.PrecioTotal), 0);
    }

    this.forma.get('ValorTotal').setValue(sumTotal);
    this.forma.get('Valor').setValue(sumrPrecios);

    return arrayVentas;

  }



}
