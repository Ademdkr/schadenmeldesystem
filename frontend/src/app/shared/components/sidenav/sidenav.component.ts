import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css'],
  standalone: false,
})
export class SidenavComponent implements OnInit {
  id: string = '';
  userRole: string = '';
  firstName: string = '';
  lastName: string = '';
  email: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.loadUserDetails();
  }

  // Lädt die Benutzerinformationen aus dem JWT-Token
  private loadUserDetails(): void {
    const token = this.authService.getToken();
    if (token) {
      try {
        const decodedToken: any = jwtDecode(token); // Hier wird jwtDecode korrekt verwendet
        this.id = decodedToken.id;
        this.userRole = decodedToken.department;
        this.firstName = decodedToken.firstName;
        this.lastName = decodedToken.lastName;
        this.email = decodedToken.sub;
        console.log(decodedToken); // Debugging-Zwecke
      } catch (error) {
        console.error('Ungültiges Token:', error);
        this.authService.logout(); // Token ist ungültig → Benutzer ausloggen
      }
    }
  }

  logout(): void {
    this.authService.logout();
  }
}
