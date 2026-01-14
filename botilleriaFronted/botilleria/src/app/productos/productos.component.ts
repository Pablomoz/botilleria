import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ProductoService, Producto } from '../core/services/producto.service';
import { ProductoDialogComponent } from './producto-dialog/producto-dialog.component';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {

  displayedColumns: string[] = [
    'nombre',
    'categoria',
    'precioVenta',
    'stock',
    'stockCritico',
    'costoCompra',
    'acciones'
  ];

  productos: Producto[] = [];
  productosFiltrados: Producto[] = [];

  constructor(
    private dialog: MatDialog,
    private productoService: ProductoService
  ) {}

  ngOnInit(): void {
    this.cargarProductos();
  }

  cargarProductos() {
    this.productoService.listar().subscribe({
      next: data => {
        this.productos = data;
        this.productosFiltrados = data;
      }
    });
  }

  filtrar(event: Event) {
    const texto = (event.target as HTMLInputElement).value.toLowerCase().trim();
    this.productosFiltrados = this.productos.filter(p =>
      p.nombre.toLowerCase().includes(texto) ||
      p.categoria.toLowerCase().includes(texto)
    );
  }

  nuevo() {
    const dialogRef = this.dialog.open(ProductoDialogComponent, {
      width: '450px',
      data: null
    });

    dialogRef.afterClosed().subscribe(r => {
      if (r) this.cargarProductos();
    });
  }

  editar(p: Producto) {
    const dialogRef = this.dialog.open(ProductoDialogComponent, {
      width: '450px',
      data: p
    });

    dialogRef.afterClosed().subscribe(r => {
      if (r) this.cargarProductos();
    });
  }

  eliminar(p: Producto) {
    if (!confirm('¿Eliminar producto?')) return;

    this.productoService.eliminar(p.idProducto).subscribe(() => {
      this.cargarProductos();
    });
  }

  descargarPDF(p: Producto) {
    this.productoService.descargarPDF(p.idProducto).subscribe(blob => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `producto_${p.idProducto}.pdf`;
      a.click();
      window.URL.revokeObjectURL(url);
    });
  }
}
