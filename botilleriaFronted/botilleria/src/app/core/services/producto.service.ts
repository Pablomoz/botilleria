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

  private apiUrl = 'http://localhost:5000/api/productos'; // Ajusta a tu backend

  constructor(private http: HttpClient) {}

  listar(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.apiUrl);
  }

  crear(prod: Producto): Observable<any> {
    return this.http.post(this.apiUrl, prod);
  }

  actualizar(id: number, prod: Producto): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, prod);
  }

  eliminar(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
