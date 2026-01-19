import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { Venta } from '../../core/services/venta.service';

@Component({
  selector: 'app-venta-detalle-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatTableModule,
    MatButtonModule
  ],
  templateUrl: './venta-detalle-dialog.component.html',
  styleUrls: ['./venta-detalle-dialog.component.css']
})
export class VentaDetalleDialogComponent {

  displayedColumns = ['nombre', 'cantidad', 'precio', 'subtotal'];

  constructor(
    public dialogRef: MatDialogRef<VentaDetalleDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public venta: Venta
  ) {}

  cerrar() {
    this.dialogRef.close();
  }
}
