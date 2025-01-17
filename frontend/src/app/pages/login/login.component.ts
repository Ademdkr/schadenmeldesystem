import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: false
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value; // Extrahiere die Werte aus dem Formular
      this.http.post('http://localhost:8080/api/auth/login', { email, password }).subscribe({
        next: (response: any) => {
          alert('Login erfolgreich!');
          this.authService.login(email, password); // Hier: Übergabe von email und password
          this.router.navigate(['/uebersicht']); // Nach erfolgreichem Login weiterleiten
        },
        error: () => {
          alert('Anmeldung fehlgeschlagen. Bitte prüfen Sie Ihre Eingaben.');
        },
      });
    }
  }

}
