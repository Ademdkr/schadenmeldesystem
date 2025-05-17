import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
// import { Observable } from 'rxjs';
import {environment} from '../../environments/environment.prod';

interface LoginResponse {
  token: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private token: string | null = null;

  constructor(private http: HttpClient, private router: Router) {
  }

  login(email: string, password: string): void {
    this.http
      .post<LoginResponse>(`${environment.apiBaseUrl}/auth/login`, {email, password})
      .subscribe({
        next: ({token}) => {
          this.setToken(token);
          this.router.navigate(['/uebersicht']);
        },
        error: () => {
          alert('Login fehlgeschlagen. Bitte überprüfen Sie Ihre Eingaben.');
        },
      });
  }

  /** Speichert Token intern und in localStorage */
  setToken(token: string): void {
    this.token = token;
    localStorage.setItem('token', token);
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
    return localStorage.getItem('token');
  }
}
