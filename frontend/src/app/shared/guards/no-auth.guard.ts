import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class NoAuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (!this.authService.isLoggedIn()) {
      return true; // Zugriff auf die Login-Seite gewähren
    } else {
      this.router.navigate(['/uebersicht']); // Benutzer umleiten, wenn er bereits angemeldet ist
      return false;
    }
  }
}
