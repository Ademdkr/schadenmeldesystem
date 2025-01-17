import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private token: string | null = null;

  constructor(private http: HttpClient, private router: Router) {}

  login(email: string, password: string): void {
    this.http.post('http://localhost:8080/api/auth/login', { email, password }).subscribe({
      next: (response: any) => {
        this.token = response.token;
        localStorage.setItem('token', this.token!);
        this.router.navigate(['/uebersicht']);
      },
      error: () => {
        alert('Login fehlgeschlagen. Bitte überprüfen Sie Ihre Eingaben.');
      },
    });
  }

  logout(): void {
    this.token = null;
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return !!this.token || !!localStorage.getItem('token');
  }

  getToken(): string | null {
    return localStorage.getItem('token'); // Sicherstellen, dass hier der richtige Schlüssel genutzt wird
  }

}
