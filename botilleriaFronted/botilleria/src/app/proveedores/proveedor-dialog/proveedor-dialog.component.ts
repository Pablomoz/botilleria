import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ProveedorService, Proveedor } from '../../core/services/proveedor.service';

@Component({
  selector: 'app-proveedor-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './proveedor-dialog.component.html',
  styleUrls: ['./proveedor-dialog.component.css']
})
export class ProveedorDialogComponent implements OnInit {

  form!: FormGroup;
  esEditar = false;

  constructor(
    private fb: FormBuilder,
    private proveedorService: ProveedorService,
    private dialogRef: MatDialogRef<ProveedorDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Proveedor | null
  ) {}

  ngOnInit(): void {
    this.esEditar = this.data !== null;

    this.form = this.fb.group({
      idProveedor: [this.data?.idProveedor || 0],
      nombre: [this.data?.nombre || '', Validators.required],
      rut: [this.data?.rut || '', Validators.required],
      telefono: [this.data?.telefono || ''],
      email: [this.data?.email || '', Validators.email],
      direccion: [this.data?.direccion || ''],
      contacto: [this.data?.contacto || ''],
      activo: [this.data?.activo ?? true]
    });
  }

  guardar() {
    if (this.form.invalid) return;

    const proveedor: Proveedor = this.form.value;

    if (this.esEditar) {
      this.proveedorService.editar(proveedor).subscribe({
        next: () => this.dialogRef.close(true)
      });
    } else {
      this.proveedorService.guardar(proveedor).subscribe({
        next: () => this.dialogRef.close(true)
      });
    }
  }

  cancelar() {
    this.dialogRef.close(false);
  }
}
