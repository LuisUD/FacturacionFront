import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClientesComponent } from './pages/clientes/clientes.component';
import { ClienteComponent } from './pages/cliente/cliente.component';
import { ProductosComponent } from './pages/productos/productos.component';
import { ProductoComponent } from './pages/producto/producto.component';
import { FacturaComponent } from './pages/factura/factura.component';
import { FacturasComponent } from './pages/facturas/facturas.component';
import { ProductoMinimosComponent } from './pages/producto-minimos/producto-minimos.component';
import { ProductoVentaAnioComponent } from './pages/producto-venta-anio/producto-venta-anio.component';
import { VentasComponent } from './pages/ventas/ventas.component';


const routes: Routes = [
  { path: 'clientes', component: ClientesComponent },
  { path: 'cliente/:id', component: ClienteComponent },
  { path: 'productos', component: ProductosComponent },
  { path: 'producto/:id', component: ProductoComponent },
  { path: 'facturas', component: FacturasComponent },
  { path: 'factura/:id', component: FacturaComponent },
  { path: 'productoMinimo', component: ProductoMinimosComponent },
  { path: 'prductoVentasAnio', component: ProductoVentaAnioComponent },
  { path: 'ventas/:id', component: VentasComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'clientes' }
];



@NgModule({
  imports: [
    RouterModule.forRoot( routes )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
