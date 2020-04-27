import { FacturaModel } from './factura.model';
import { VentaModel } from './venta.model';


export class InputCrearFacturaModel {

    Factura: FacturaModel;
    Ventas: VentaModel[];

    constructor(factura: FacturaModel, ventas: VentaModel[]) {
        this.Factura = factura;
        this.Ventas = ventas;
    }

}

