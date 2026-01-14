import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';
import { ProductoService, Producto } from '../core/services/producto.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatCardModule, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {

  totalProductos = 0;
  productosStockCritico = 0;
  valorInventario = 0;
  productosActivos = 0;

  constructor(private productoService: ProductoService) {}

  ngOnInit(): void {
    this.cargarEstadisticas();
  }

  cargarEstadisticas() {
    this.productoService.listar().subscribe({
      next: (productos) => {
        this.totalProductos = productos.length;
        this.productosActivos = productos.filter(p => p.activo).length;
        this.productosStockCritico = productos.filter(p => p.stock <= p.stockCritico).length;
        this.valorInventario = productos.reduce((sum, p) => sum + (p.precioVenta * p.stock), 0);
      }
    });
  }
}
