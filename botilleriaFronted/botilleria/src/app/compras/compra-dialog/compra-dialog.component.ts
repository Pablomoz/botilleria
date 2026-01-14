import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ProductoService, Producto } from '../../core/services/producto.service';
import { ProveedorService, Proveedor } from '../../core/services/proveedor.service';
import { CompraService, Compra, CompraDetalle } from '../../core/services/compra.service';

interface ItemCompra {
  producto: Producto;
  cantidad: number;
  precioUnitario: number;
  subtotal: number;
}

@Component({
  selector: 'app-compra-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatSnackBarModule
  ],
  templateUrl: './compra-dialog.component.html',
  styleUrls: ['./compra-dialog.component.css']
})
export class CompraDialogComponent implements OnInit {

  proveedores: Proveedor[] = [];
  productos: Producto[] = [];
  productosFiltrados: Producto[] = [];

  proveedorSeleccionado: number | null = null;
  textoBusqueda = '';
  items: ItemCompra[] = [];
  displayedColumns = ['producto', 'precio', 'cantidad', 'subtotal', 'acciones'];

  soloLectura = false;
  compraExistente: Compra | null = null;

  constructor(
    private proveedorService: ProveedorService,
    private productoService: ProductoService,
    private compraService: CompraService,
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<CompraDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    if (this.data?.soloLectura) {
      this.soloLectura = true;
      this.compraExistente = this.data.compra;
    } else {
      this.cargarProveedores();
      this.cargarProductos();
    }
  }

  cargarProveedores() {
    this.proveedorService.listar().subscribe({
      next: data => this.proveedores = data.filter(p => p.activo)
    });
  }

  cargarProductos() {
    this.productoService.listar().subscribe({
      next: data => this.productos = data.filter(p => p.activo)
    });
  }

  buscar() {
    const texto = this.textoBusqueda.toLowerCase().trim();
    if (texto.length < 2) {
      this.productosFiltrados = [];
      return;
    }
    this.productosFiltrados = this.productos.filter(p =>
      p.nombre.toLowerCase().includes(texto) ||
      p.categoria.toLowerCase().includes(texto)
    );
  }

  agregarProducto(producto: Producto) {
    const existente = this.items.find(i => i.producto.idProducto === producto.idProducto);

    if (existente) {
      existente.cantidad++;
      existente.subtotal = existente.cantidad * existente.precioUnitario;
    } else {
      this.items.push({
        producto,
        cantidad: 1,
        precioUnitario: producto.costoCompra,
        subtotal: producto.costoCompra
      });
    }

    this.textoBusqueda = '';
    this.productosFiltrados = [];
  }

  actualizarSubtotal(item: ItemCompra) {
    item.subtotal = item.cantidad * item.precioUnitario;
  }

  eliminarItem(item: ItemCompra) {
    const index = this.items.indexOf(item);
    if (index > -1) {
      this.items.splice(index, 1);
    }
  }

  get total(): number {
    return this.items.reduce((sum, item) => sum + item.subtotal, 0);
  }

  guardar() {
    if (!this.proveedorSeleccionado) {
      this.snackBar.open('Seleccione un proveedor', 'Cerrar', { duration: 2000 });
      return;
    }

    if (this.items.length === 0) {
      this.snackBar.open('Agregue al menos un producto', 'Cerrar', { duration: 2000 });
      return;
    }

    const detalles: CompraDetalle[] = this.items.map(item => ({
      idProducto: item.producto.idProducto,
      cantidad: item.cantidad,
      precioUnitario: item.precioUnitario
    }));

    const compra: Compra = {
      idProveedor: this.proveedorSeleccionado,
      total: this.total,
      detalles
    };

    this.compraService.registrar(compra).subscribe({
      next: (response) => {
        this.snackBar.open(`Compra #${response.idCompra} registrada. Stock actualizado.`, 'Cerrar', { duration: 3000 });
        this.dialogRef.close(true);
      },
      error: () => {
        this.snackBar.open('Error al registrar la compra', 'Cerrar', { duration: 3000 });
      }
    });
  }

  cancelar() {
    this.dialogRef.close(false);
  }
}
