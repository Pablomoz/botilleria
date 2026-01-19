import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface VentaDetalle {
  idProducto: number;
  cantidad: number;
  precioUnitario: number;
  nombre?: string;
}

export interface Venta {
  idVenta?: number;
  fecha?: Date;
  total: number;
  idUsuario: number;
  detalles: VentaDetalle[];
}

export interface VentaResponse {
  idVenta: number;
  mensaje: string;
}

export interface ProductoEstadistica {
  idProducto: number;
  nombre: string;
  categoria: string;
  cantidadVendida: number;
  totalVendido: number;
  numeroVentas: number;
}

@Injectable({
  providedIn: 'root'
})
export class VentaService {

  private baseUrl = 'http://localhost:5013/api/Venta';

  constructor(private http: HttpClient) {}

  registrar(venta: Venta): Observable<VentaResponse> {
    return this.http.post<VentaResponse>(`${this.baseUrl}/Registrar`, venta);
  }

  listar(): Observable<Venta[]> {
    return this.http.get<Venta[]>(`${this.baseUrl}/Listar`);
  }

  obtenerPorId(id: number): Observable<Venta> {
    return this.http.get<Venta>(`${this.baseUrl}/${id}`);
  }

  obtenerMasVendidos(top: number = 10): Observable<ProductoEstadistica[]> {
    return this.http.get<ProductoEstadistica[]>(`${this.baseUrl}/MasVendidos?top=${top}`);
  }

  obtenerMenosVendidos(top: number = 10): Observable<ProductoEstadistica[]> {
    return this.http.get<ProductoEstadistica[]>(`${this.baseUrl}/MenosVendidos?top=${top}`);
  }
}
