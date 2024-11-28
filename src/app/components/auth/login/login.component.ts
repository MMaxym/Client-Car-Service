import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import {Router, RouterLink} from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    RouterLink
  ]
})

export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onLogin() {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      this.authService.login(username, password).subscribe({
        next: (response) => {
          localStorage.setItem('authToken', response.token);
          sessionStorage.setItem('userId', response.userId);
          sessionStorage.setItem('userName', response.name);
          sessionStorage.setItem('userSurname', response.surname);
          sessionStorage.setItem('userEmail', response.email);
          sessionStorage.setItem('userPhone', response.phone);

          const role = response.role;

          if (username === 'admin') {
            this.router.navigate(['/adminMain']);
          }
          else if (role === 'Admin') {
            this.router.navigate(['/adminMain']);
          }
          else if (role === 'User') {
            this.router.navigate(['/userMain']);
          }
          alert('Авторизація успішна !!!');
        },
        error: (err) => {
          console.error(err);
        },
      });
    }
  }
}
