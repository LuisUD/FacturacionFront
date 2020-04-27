import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { FacturasService } from '../../services/facturas.service';
import { FacturaModel } from '../../models/factura.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-facturas',
  templateUrl: './facturas.component.html',
  styleUrls: ['./facturas.component.css']
})
export class FacturasComponent implements OnInit {

  facturas: FacturaModel[] = [];
  cargando = false;

  fechaInicio: string;
  fechaFin: string;

  facturasFiltrados: Observable<FacturaModel[]>;

  constructor(private facturasService: FacturasService) { }

  ngOnInit() {

    this.cargando = true;

    this.facturasService.getFacturas()
      .subscribe(resp => {
        this.facturas = resp;
        this.cargando = false;
        this.facturasFiltrados = of(resp);
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


  filtarfacturas(valor: string): FacturaModel[] {
    let facturasFiltrados: FacturaModel[] = [];

    console.log(valor);
    console.log(this.facturas);

    //facturasFiltrados = facturasFiltrados.concat(this.facturas.filter(option => option.idfactura == valor));

    console.log(facturasFiltrados);

    return facturasFiltrados;

  }

  borrarFactura(factura: FacturaModel, i: number) {

    Swal.fire({
      title: '¿Está seguro?',
      text: `Está seguro que desea borrar a ${factura.IdFactura}`,
      type: 'question',
      showConfirmButton: true,
      showCancelButton: true
    }).then(resp => {

      if (resp.value) {
        this.facturas.splice(i, 1);
        this.facturasService.borrarFactura(factura.IdFactura).subscribe();
      }

    });



  }

  private formatDate(m) {

    return m.getUTCFullYear() + "-" + (m.getUTCMonth() + 1) + "-" + m.getUTCDate();
  }

}
