import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Producto {
  idProducto: number;
  nombre: string;
  categoria: string;
  precioVenta: number;
  costoCompra: number;
  stock: number;
  stockCritico: number;
  codigoBarra?: string;
  fechaVencimiento?: Date;
  activo: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

 private baseUrl = 'http://localhost:5013/api/Producto';

  constructor(private http: HttpClient) {}

  listar(): Observable<Producto[]> {
    return this.http.get<Producto[]>(`${this.baseUrl}/Listar`);
  }

crear(model: Producto): Observable<boolean> {
  return this.http.post<boolean>(`${this.baseUrl}/Guardar`, model);
}

editar(model: Producto): Observable<boolean> {
  return this.http.put<boolean>(`${this.baseUrl}/EditarProducto`, model);
}


  eliminar(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/Eliminar/${id}`);
  }

  obtenerPorId(id: number): Observable<Producto> {
    return this.http.get<Producto>(`${this.baseUrl}/${id}`);
  }

  descargarPDF(id: number): Observable<Blob> {
 return this.http.get(`${this.baseUrl}/descargarpdf/${id}`, {
    responseType: 'blob'
  });
}
}