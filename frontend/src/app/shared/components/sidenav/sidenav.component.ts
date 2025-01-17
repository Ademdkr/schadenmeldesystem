import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css'],
  standalone: false,
})
export class SidenavComponent implements OnInit {
  userRole = '';
  firstName = '';
  lastName = '';
  email = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    const userData = this.authService.getUserData(); // Benutzerdaten abrufen
    if (userData) {
      this.userRole = userData.department;
      this.firstName = userData.firstName;
      this.lastName = userData.lastName;
      this.email = userData.email;
    }
  }

  logout(): void {
    this.authService.logout(); // Logout durchführen
    this.router.navigate(['/login']); // Zur Login-Seite umleiten
  }
}
