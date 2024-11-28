import { Component } from '@angular/core';
import { UserService} from '../../services/user.service'; // Імпортуємо сервіс
import {Router, RouterLink, RouterLinkActive} from '@angular/router';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  imports: [
    FormsModule,
    RouterLinkActive,
    RouterLink
  ],
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent {
  name: string = sessionStorage.getItem('userName') || '';
  surname: string = sessionStorage.getItem('userSurname') || '';
  email: string = sessionStorage.getItem('userEmail') || '';
  phoneNumber: string = sessionStorage.getItem('userPhone') || '';
  userId: string = sessionStorage.getItem('userId') || '';

  constructor(
    private userService: UserService,
    private router: Router
  ) {}

  editProfile(): void {
    if (this.name && this.surname && this.email && this.phoneNumber) {
      const userData = {
        name: this.name,
        surname: this.surname,
        email: this.email,
        phoneNumber: this.phoneNumber
      };

      this.userService.editUser(this.userId, userData).subscribe({
        next: (response) => {
          sessionStorage.setItem('userName', this.name);
          sessionStorage.setItem('userSurname', this.surname);
          sessionStorage.setItem('userEmail', this.email);
          sessionStorage.setItem('userPhone', this.phoneNumber);

          alert('Інформація успішно оновлена!');
          this.router.navigate(['/userMain']);
        },
        error: (error) => {
          console.error('Помилка при оновленні даних', error);
          alert('Щось пішло не так. Спробуйте ще раз.');
        }
      });
    } else {
      alert('Будь ласка, заповніть всі поля.');
    }
  }

  logout(): void {
    const confirmLogout = window.confirm("Ви дійсно хочете вийти з акаунту?");
    if (confirmLogout) {
      localStorage.clear();
      this.router.navigate(['/login']);
    }
  }
}
