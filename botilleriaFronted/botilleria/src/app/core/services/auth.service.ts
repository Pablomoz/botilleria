import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:5013/api/auth'; // AJÚSTALO A TU BACKEND

  constructor(private http: HttpClient) { }

  login(data: { email: string, password: string }): Observable<boolean> {
    return this.http.post<any>(`${this.apiUrl}/login`, data).pipe(
      tap(resp => {
        if (resp.token) {
          localStorage.setItem('token', resp.token);
        }
      }),
      map(resp => !!resp.token)
    );
  }

  logout() {
    localStorage.removeItem('token');
  }

  isLogged(): boolean {
    return !!localStorage.getItem('token');
  }
}
