

export class FacturaModel {

    IdFactura: number;
    IdCliente: number;
    NombreCliente: string;
    Valor: number;
    ValorTotal: number;
    FechaFacturacion: string;



    constructor(
        idCliente: number,
        valor: number,
        valorTotal: number,
        fechaFacturacion: string
    ) {
        this.IdCliente = idCliente;
        this.Valor = valor;
        this.ValorTotal = valorTotal;
        this.FechaFacturacion = fechaFacturacion;

    }

}

