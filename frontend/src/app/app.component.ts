import { Component } from '@angular/core';
import { AuthService } from './shared/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: false
})
export class AppComponent {
  // Titel initialisieren, damit Tests und Template greifen
  title = 'frontend';

  constructor(public authService: AuthService) {}
}
