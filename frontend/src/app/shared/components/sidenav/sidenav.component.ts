import {Component} from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css'],
  standalone: false,
})
export class SidenavComponent {
  userRole = 'Werkstatt';
  firstName = 'Max';
  lastName = 'Mustermann';
  email = 'max.mustermann@example.com';

  logout() {
    console.log('Logout ausgeführt');
    // Logout-Logik hinzufügen (z. B. Redirect oder Token löschen)
  }
}
