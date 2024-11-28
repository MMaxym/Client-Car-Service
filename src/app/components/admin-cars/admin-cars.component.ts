import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CarService } from '../../services/car.service';
import { UserService } from '../../services/user.service';
import { NgForOf, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-cars',
  templateUrl: './admin-cars.component.html',
  imports: [
    NgForOf,
    FormsModule,
    NgIf,
    RouterLinkActive,
    RouterLink
  ],
  styleUrls: ['./admin-cars.component.css']
})
export class AdminCarsComponent implements OnInit {
  cars: any[] = [];
  users: any[] = [];
  isModalOpen = false;
  carIdToDelete: string | null = null;
  isEditMode = true;
  selectedCarId: string | null = null;

  newCar = {
    id: null,
    make: '',
    model: '',
    year: null,
    number: '',
    vin: '',
    mileage: null,
    userId: ''
  };

  constructor(
    private router: Router,
    private carService: CarService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.fetchCars();
    this.fetchUsers();
  }

  fetchCars() {
    this.carService.getCars().subscribe((data: any[]) => {
      this.cars = data;
    });
  }

  fetchUsers() {
    this.userService.getUsers().subscribe((data: any[]) => {
      this.users = data.filter(user => user.role === 'User');
    });
  }

  openModal(carId: string | null = null): void {
    if (carId) {
      this.selectedCarId = carId;
      const car = this.cars.find(c => c.id === carId);
      if (car) {
        this.newCar = { ...car };
      }
    } else {
      this.resetForm();
    }
    this.isModalOpen = true;
  }


  closeModal(): void {
    this.isModalOpen = false;
    this.resetForm();
  }

  resetForm(): void {
    this.newCar = {
      id: null,
      make: '',
      model: '',
      year: null,
      number: '',
      vin: '',
      mileage: null,
      userId: ''
    };
    this.selectedCarId = null;
  }

  addCar(): void {
    this.carService.addCar(this.newCar).subscribe({
      next: (response) => {
        alert('Автомобіль успішно додано!');
        this.fetchCars();
        this.closeModal();
      },
      error: (error) => {
        console.error('Помилка при додаванні автомобіля', error);
        alert('Сталася помилка. Спробуйте ще раз.');
      }
    });
  }

  updateCar(): void {
    if (!this.selectedCarId) {
      alert('ID автомобіля відсутнє!');
      return;
    }

    this.carService.updateCar(this.selectedCarId, this.newCar).subscribe({
      next: (response) => {
        alert('Автомобіль успішно оновлено!');
        this.fetchCars();
        this.closeModal();
      },
      error: (error) => {
        console.error('Помилка при оновленні автомобіля', error);
        alert('Сталася помилка. Спробуйте ще раз.');
      }
    });
  }

  saveCar(): void {
    if (this.newCar.id) {
      this.updateCar();
    } else {
      this.addCar();
    }
  }

  confirmDelete(carId: string): void {
    const confirmDeletion = window.confirm('Ви дійсно хочете видалити цей автомобіль?');
    if (confirmDeletion) {
      this.deleteCar(carId);
    }
  }

  deleteCar(carId: string): void {
    this.carService.deleteCar(carId).subscribe({
      next: () => {
        alert('Автомобіль успішно видалено!');
        this.fetchCars();
      },
      error: (error) => {
        console.error('Помилка при видаленні автомобіля', error);
        alert('Сталася помилка. Спробуйте ще раз.');
      }
    });
  }

  logout(): void {
    const confirmLogout = window.confirm("Ви дійсно хочете вийти з акаунту?");
    if (confirmLogout) {
      localStorage.clear();
      this.router.navigate(['/login']);
    }
  }
}
