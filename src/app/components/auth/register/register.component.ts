import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import {Router, RouterLink} from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {CommonModule} from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    RouterLink
  ]
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      name: ['', Validators.required],
      surname: ['', Validators.required],
      phoneNumber: ['', Validators.required],
    });
  }

  onRegister() {
    if (this.registerForm.valid) {
      const { username, email, password, name, surname, phoneNumber } = this.registerForm.value;

      this.authService.register({
        username,
        email,
        password,
        name,
        surname,
        phoneNumber,
      }).subscribe({
        next: () => {
          alert('Реєстрація успішна !!!');
          this.router.navigate(['/login']);
        },
        error: (err) => {
          console.error(err);
        },
      });
    }
  }
}
