import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Proveedor {
  idProveedor: number;
  nombre: string;
  rut: string;
  telefono: string;
  email: string;
  direccion: string;
  contacto: string;
  activo: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ProveedorService {

  private baseUrl = 'http://localhost:5013/api/Proveedor';

  constructor(private http: HttpClient) {}

  listar(): Observable<Proveedor[]> {
    return this.http.get<Proveedor[]>(`${this.baseUrl}/Listar`);
  }

  obtenerPorId(id: number): Observable<Proveedor> {
    return this.http.get<Proveedor>(`${this.baseUrl}/${id}`);
  }

  guardar(proveedor: Proveedor): Observable<boolean> {
    return this.http.post<boolean>(`${this.baseUrl}/Guardar`, proveedor);
  }

  editar(proveedor: Proveedor): Observable<boolean> {
    return this.http.put<boolean>(`${this.baseUrl}/Editar`, proveedor);
  }

  eliminar(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.baseUrl}/Eliminar/${id}`);
  }
}
