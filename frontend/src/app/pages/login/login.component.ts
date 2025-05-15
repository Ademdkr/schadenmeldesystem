import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';

interface LoginResponse {
  token: string;
}

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
    if (!this.loginForm.valid) { return; }
    const { email, password } = this.loginForm.value;

    this.http
      .post<LoginResponse>('http://localhost:8080/api/auth/login', { email, password })
      .subscribe({
        next: ({ token }) => {
          alert('Login erfolgreich!');
          // Nutze den tatsächlich zurückgelieferten Token
          this.authService.setToken(token);
          this.router.navigate(['/uebersicht']);
        },
        error: () => {
          alert('Anmeldung fehlgeschlagen. Bitte prüfen Sie Ihre Eingaben.');
        },
      });
  }
}
