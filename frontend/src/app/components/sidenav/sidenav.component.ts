import { Component } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [MatSidenavModule, MatListModule, MatButtonModule, RouterModule, NgIf],
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
