import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:5013/api/'; // AJÚSTALO A TU BACKEND

  constructor(private http: HttpClient) { }

ValidarUsuario(data: { email: string; password: string }) {
  return this.http.post(`${this.apiUrl}Login/ValidarUsuario`, data, { responseType: 'text' });
}

AgregarUsuario(data: { email: string; password: string }) {
  return this.http.post(`${this.apiUrl}Login/AgregarUsuario`, data);
}

logout() {
  localStorage.removeItem('token');
}

isLogged(): boolean {
  return !!localStorage.getItem('token');
}
}