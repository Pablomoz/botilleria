import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Producto {
  idProducto: number;
  nombre: string;
  categoria: string;
  precioVenta: number;
  stock: number;
  stockCritico: number;
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

  crear(prod: Producto): Observable<any> {
    return this.http.post(`${this.baseUrl}/Guardar`, prod);
  }

  actualizar(id: number, prod: Producto): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, prod);
  }

  eliminar(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  obtenerPorId(id: number): Observable<Producto> {
    return this.http.get<Producto>(`${this.baseUrl}/${id}`);
  }
}