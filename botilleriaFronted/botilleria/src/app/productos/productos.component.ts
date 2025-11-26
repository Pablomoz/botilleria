import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
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
    MatDialogModule
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
    'acciones'
  ];

  productos: Producto[] = [];

  constructor(
    private productoService: ProductoService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.cargarProductos();
  }

  cargarProductos() {
    this.productoService.listar().subscribe({
      next: (data) => this.productos = data
    });
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

    this.productoService.eliminar(p.idProducto).subscribe({
      next: () => this.cargarProductos()
    });
  }
}
