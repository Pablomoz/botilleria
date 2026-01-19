import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { ProductoService, Producto } from '../core/services/producto.service';
import { VentaService, Venta, VentaDetalle } from '../core/services/venta.service';

interface DatosTarjeta {
  numero: string;
  vencimiento: string;
  cvv: string;
  nombre: string;
}

interface ItemCarrito {
  producto: Producto;
  cantidad: number;
  subtotal: number;
}

@Component({
  selector: 'app-pos',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatSnackBarModule,
    MatDividerModule,
    MatButtonToggleModule
  ],
  templateUrl: './pos.component.html',
  styleUrls: ['./pos.component.css']
})
export class PosComponent implements OnInit {

  // Búsqueda
  textoBusqueda = '';
  productos: Producto[] = [];
  productosFiltrados: Producto[] = [];

  // Carrito
  carrito: ItemCarrito[] = [];
  displayedColumns = ['nombre', 'precio', 'cantidad', 'subtotal', 'acciones'];

  // Metodo de pago
  metodoPago: 'efectivo' | 'tarjeta' = 'efectivo';
  tarjeta: DatosTarjeta = {
    numero: '',
    vencimiento: '',
    cvv: '',
    nombre: ''
  };

  constructor(
    private productoService: ProductoService,
    private ventaService: VentaService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.cargarProductos();
  }

  cargarProductos() {
    this.productoService.listar().subscribe({
      next: data => {
        this.productos = data.filter(p => p.activo && p.stock > 0);
        this.productosFiltrados = [];
      }
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
      p.categoria.toLowerCase().includes(texto) ||
      (p.codigoBarra && p.codigoBarra.includes(texto))
    );
  }

  agregarAlCarrito(producto: Producto) {
    const existente = this.carrito.find(item => item.producto.idProducto === producto.idProducto);

    if (existente) {
      if (existente.cantidad < producto.stock) {
        existente.cantidad++;
        existente.subtotal = existente.cantidad * producto.precioVenta;
      } else {
        this.snackBar.open('Stock insuficiente', 'Cerrar', { duration: 2000 });
      }
    } else {
      this.carrito.push({
        producto,
        cantidad: 1,
        subtotal: producto.precioVenta
      });
    }

    // Reasignar array para que mat-table detecte los cambios
    this.carrito = [...this.carrito];

    this.textoBusqueda = '';
    this.productosFiltrados = [];
  }

  incrementar(item: ItemCarrito) {
    if (item.cantidad < item.producto.stock) {
      item.cantidad++;
      item.subtotal = item.cantidad * item.producto.precioVenta;
      this.carrito = [...this.carrito];
    } else {
      this.snackBar.open('Stock insuficiente', 'Cerrar', { duration: 2000 });
    }
  }

  decrementar(item: ItemCarrito) {
    if (item.cantidad > 1) {
      item.cantidad--;
      item.subtotal = item.cantidad * item.producto.precioVenta;
      this.carrito = [...this.carrito];
    }
  }

  eliminarDelCarrito(item: ItemCarrito) {
    const index = this.carrito.indexOf(item);
    if (index > -1) {
      this.carrito.splice(index, 1);
      this.carrito = [...this.carrito];
    }
  }

  get total(): number {
    return this.carrito.reduce((sum, item) => sum + item.subtotal, 0);
  }

  get cantidadItems(): number {
    return this.carrito.reduce((sum, item) => sum + item.cantidad, 0);
  }

  limpiarCarrito() {
    this.carrito = [];
    this.metodoPago = 'efectivo';
    this.tarjeta = { numero: '', vencimiento: '', cvv: '', nombre: '' };
  }

  // Formatear numero de tarjeta con espacios
  formatearNumeroTarjeta(event: any) {
    let valor = event.target.value.replace(/\s/g, '').replace(/\D/g, '');
    let formateado = '';
    for (let i = 0; i < valor.length && i < 16; i++) {
      if (i > 0 && i % 4 === 0) formateado += ' ';
      formateado += valor[i];
    }
    this.tarjeta.numero = formateado;
  }

  // Formatear vencimiento MM/AA
  formatearVencimiento(event: any) {
    let valor = event.target.value.replace(/\D/g, '');
    if (valor.length >= 2) {
      valor = valor.substring(0, 2) + '/' + valor.substring(2, 4);
    }
    this.tarjeta.vencimiento = valor;
  }

  // Validar datos de tarjeta
  tarjetaValida(): boolean {
    const numeroLimpio = this.tarjeta.numero.replace(/\s/g, '');
    return (
      numeroLimpio.length >= 15 &&
      this.tarjeta.vencimiento.length === 5 &&
      this.tarjeta.cvv.length >= 3 &&
      this.tarjeta.nombre.trim().length > 0
    );
  }

  procesarVenta() {
    if (this.carrito.length === 0) {
      this.snackBar.open('El carrito está vacío', 'Cerrar', { duration: 2000 });
      return;
    }

    const detalles: VentaDetalle[] = this.carrito.map(item => ({
      idProducto: item.producto.idProducto,
      cantidad: item.cantidad,
      precioUnitario: item.producto.precioVenta
    }));

    const venta: Venta = {
      total: this.total,
      idUsuario: 1, // Usuario por defecto
      detalles
    };

    this.ventaService.registrar(venta).subscribe({
      next: (response) => {
        this.snackBar.open(`Venta #${response.idVenta} registrada correctamente`, 'Cerrar', { duration: 3000 });
        this.limpiarCarrito();
        this.cargarProductos(); // Recargar para actualizar stock
      },
      error: (err) => {
        this.snackBar.open('Error al procesar la venta', 'Cerrar', { duration: 3000 });
        console.error(err);
      }
    });
  }
}
