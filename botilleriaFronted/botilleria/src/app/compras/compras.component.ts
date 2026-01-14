import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CompraService, Compra } from '../core/services/compra.service';
import { CompraDialogComponent } from './compra-dialog/compra-dialog.component';

@Component({
  selector: 'app-compras',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule
  ],
  templateUrl: './compras.component.html',
  styleUrls: ['./compras.component.css']
})
export class ComprasComponent implements OnInit {

  displayedColumns: string[] = ['idCompra', 'fecha', 'proveedor', 'total', 'acciones'];
  compras: Compra[] = [];

  constructor(
    private dialog: MatDialog,
    private compraService: CompraService
  ) {}

  ngOnInit(): void {
    this.cargarCompras();
  }

  cargarCompras() {
    this.compraService.listar().subscribe({
      next: data => this.compras = data
    });
  }

  nuevaCompra() {
    const dialogRef = this.dialog.open(CompraDialogComponent, {
      width: '800px',
      data: null
    });

    dialogRef.afterClosed().subscribe(r => {
      if (r) this.cargarCompras();
    });
  }

  verDetalle(compra: Compra) {
    this.compraService.obtenerPorId(compra.idCompra!).subscribe({
      next: data => {
        this.dialog.open(CompraDialogComponent, {
          width: '800px',
          data: { compra: data, soloLectura: true }
        });
      }
    });
  }
}
