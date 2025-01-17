import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loggedIn = false;
  private userData: any = null;

  // Simuliert den Login-Prozess
  login(userData: any): void {
    this.loggedIn = true;
    this.userData = userData; // Speichert die Benutzerdaten
    localStorage.setItem('userData', JSON.stringify(userData)); // Optional: Speicherung in LocalStorage
  }

  // Setzt den Status zurück und löscht die Benutzerdaten
  logout(): void {
    this.loggedIn = false;
    this.userData = null;
    localStorage.removeItem('userData'); // Benutzerdaten aus LocalStorage entfernen
  }

  // Gibt den Login-Status zurück
  isLoggedIn(): boolean {
    return this.loggedIn || !!localStorage.getItem('userData'); // Überprüft auch LocalStorage
  }

  // Gibt die aktuellen Benutzerdaten zurück
  getUserData(): any {
    if (!this.userData && localStorage.getItem('userData')) {
      this.userData = JSON.parse(localStorage.getItem('userData')!); // Daten aus LocalStorage abrufen
    }
    return this.userData;
  }
}
