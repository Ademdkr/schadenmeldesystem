import {Component} from '@angular/core';
import {RouterModule} from '@angular/router';
import {NgIf} from '@angular/common';
import {MaterialModule} from '../../modules/material.module';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [MaterialModule, RouterModule, NgIf],
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css'],
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
