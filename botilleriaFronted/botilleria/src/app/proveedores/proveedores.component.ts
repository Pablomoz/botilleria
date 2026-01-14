import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ProveedorService, Proveedor } from '../core/services/proveedor.service';
import { ProveedorDialogComponent } from './proveedor-dialog/proveedor-dialog.component';

@Component({
  selector: 'app-proveedores',
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
  templateUrl: './proveedores.component.html',
  styleUrls: ['./proveedores.component.css']
})
export class ProveedoresComponent implements OnInit {

  displayedColumns: string[] = ['nombre', 'rut', 'telefono', 'email', 'contacto', 'acciones'];
  proveedores: Proveedor[] = [];
  proveedoresFiltrados: Proveedor[] = [];

  constructor(
    private dialog: MatDialog,
    private proveedorService: ProveedorService
  ) {}

  ngOnInit(): void {
    this.cargarProveedores();
  }

  cargarProveedores() {
    this.proveedorService.listar().subscribe({
      next: data => {
        this.proveedores = data;
        this.proveedoresFiltrados = data;
      }
    });
  }

  filtrar(event: Event) {
    const texto = (event.target as HTMLInputElement).value.toLowerCase().trim();
    this.proveedoresFiltrados = this.proveedores.filter(p =>
      p.nombre.toLowerCase().includes(texto) ||
      p.rut.toLowerCase().includes(texto) ||
      p.contacto.toLowerCase().includes(texto)
    );
  }

  nuevo() {
    const dialogRef = this.dialog.open(ProveedorDialogComponent, {
      width: '500px',
      data: null
    });

    dialogRef.afterClosed().subscribe(r => {
      if (r) this.cargarProveedores();
    });
  }

  editar(p: Proveedor) {
    const dialogRef = this.dialog.open(ProveedorDialogComponent, {
      width: '500px',
      data: p
    });

    dialogRef.afterClosed().subscribe(r => {
      if (r) this.cargarProveedores();
    });
  }

  eliminar(p: Proveedor) {
    if (!confirm('¿Eliminar proveedor?')) return;

    this.proveedorService.eliminar(p.idProveedor).subscribe(() => {
      this.cargarProveedores();
    });
  }
}
