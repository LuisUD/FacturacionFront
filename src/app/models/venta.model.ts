

export class VentaModel {

    IdVenta: number;
    IdFactura: number;
    IdProducto: number;
    NombreProducto: string;
    Cantidad: number;
    PrecioUnitario: number;
    PrecioTotal: number;



    constructor(
        idProducto: number,
        nombreProducto: string,
        cantidad: number,
        precioUnitario: number,
        precioTotal: number
    ) 
    {
        this.IdProducto = idProducto;
        this.NombreProducto = nombreProducto;
        this.Cantidad = cantidad;
        this.PrecioUnitario = precioUnitario;
        this.PrecioTotal = precioTotal;
        
    }

}

