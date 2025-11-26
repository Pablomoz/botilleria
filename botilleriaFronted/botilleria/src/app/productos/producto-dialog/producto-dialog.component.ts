import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { FormBuilder, ReactiveFormsModule, Validators, FormGroup } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Producto, ProductoService } from '../../core/services/producto.service';

@Component({
  selector: 'app-producto-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './producto-dialog.component.html',
  styleUrls: ['./producto-dialog.component.css']
})
export class ProductoDialogComponent {

  titulo = 'Nuevo Producto';
  form!: FormGroup;

  constructor(
    private builder: FormBuilder,
    private productoService: ProductoService,
    private dialogRef: MatDialogRef<ProductoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Producto | null
  ) {
    this.form = this.builder.group({
      idProducto: [0],
      nombre: ['', Validators.required],
      categoria: ['', Validators.required],
      precioVenta: [0, [Validators.required, Validators.min(1)]],
      stock: [0, Validators.required],
      stockCritico: [0, Validators.required]
    });

    if (data) {
      this.titulo = 'Editar Producto';
      this.form.patchValue(data);
    }
  }

  guardar() {
    if (this.form.invalid) return;

    const producto = this.form.value as Producto;

    if (producto.idProducto === 0) {
      this.productoService.crear(producto).subscribe({
        next: () => this.dialogRef.close(true)
      });
    } else {
      this.productoService.actualizar(producto.idProducto, producto).subscribe({
        next: () => this.dialogRef.close(true)
      });
    }
  }

  cerrar() {
    this.dialogRef.close(false);
  }
}
