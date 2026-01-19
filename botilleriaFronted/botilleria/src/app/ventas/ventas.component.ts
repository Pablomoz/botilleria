import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatTabsModule } from '@angular/material/tabs';
import { MatChipsModule } from '@angular/material/chips';
import { VentaService, Venta, ProductoEstadistica } from '../core/services/venta.service';
import { VentaDetalleDialogComponent } from './venta-detalle-dialog/venta-detalle-dialog.component';

@Component({
  selector: 'app-ventas',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatDialogModule,
    MatTabsModule,
    MatChipsModule
  ],
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.css']
})
export class VentasComponent implements OnInit {

  // Historial de ventas
  displayedColumns: string[] = ['idVenta', 'fecha', 'total', 'acciones'];
  ventas: Venta[] = [];
  totalVentas = 0;

  // Estadísticas de productos
  estadisticasColumns: string[] = ['posicion', 'nombre', 'categoria', 'cantidadVendida', 'totalVendido', 'numeroVentas'];
  productosMasVendidos: ProductoEstadistica[] = [];
  productosMenosVendidos: ProductoEstadistica[] = [];

  constructor(
    private ventaService: VentaService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.cargarVentas();
    this.cargarEstadisticas();
  }

  cargarVentas() {
    this.ventaService.listar().subscribe({
      next: data => {
        this.ventas = data;
        this.totalVentas = data.reduce((sum, v) => sum + v.total, 0);
      }
    });
  }

  cargarEstadisticas() {
    this.ventaService.obtenerMasVendidos(10).subscribe({
      next: data => this.productosMasVendidos = data
    });

    this.ventaService.obtenerMenosVendidos(10).subscribe({
      next: data => this.productosMenosVendidos = data
    });
  }

  verDetalle(venta: Venta) {
    this.ventaService.obtenerPorId(venta.idVenta!).subscribe({
      next: data => {
        this.dialog.open(VentaDetalleDialogComponent, {
          width: '600px',
          data: data
        });
      }
    });
  }
}
