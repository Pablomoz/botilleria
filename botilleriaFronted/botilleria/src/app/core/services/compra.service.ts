import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface CompraDetalle {
  idProducto: number;
  cantidad: number;
  precioUnitario: number;
  nombreProducto?: string;
}

export interface Compra {
  idCompra?: number;
  idProveedor: number;
  fecha?: Date;
  total: number;
  nombreProveedor?: string;
  detalles: CompraDetalle[];
}

export interface CompraResponse {
  idCompra: number;
  mensaje: string;
}

@Injectable({
  providedIn: 'root'
})
export class CompraService {

  private baseUrl = 'http://localhost:5013/api/Compra';

  constructor(private http: HttpClient) {}

  registrar(compra: Compra): Observable<CompraResponse> {
    return this.http.post<CompraResponse>(`${this.baseUrl}/Registrar`, compra);
  }

  listar(): Observable<Compra[]> {
    return this.http.get<Compra[]>(`${this.baseUrl}/Listar`);
  }

  obtenerPorId(id: number): Observable<Compra> {
    return this.http.get<Compra>(`${this.baseUrl}/${id}`);
  }
}
