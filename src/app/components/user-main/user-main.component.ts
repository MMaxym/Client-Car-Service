import { Component } from '@angular/core';
import {NgForOf, NgIf} from '@angular/common';
import {Router, RouterLink, RouterLinkActive} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {RepairRecordService} from '../../services/repair-record.service';
import {CarService} from '../../services/car.service';

@Component({
  selector: 'app-user-main',
  imports: [
    NgForOf,
    RouterLink,
    RouterLinkActive,
    FormsModule,
    NgIf
  ],
  templateUrl: './user-main.component.html',
  styleUrl: './user-main.component.css'
})
export class UserMainComponent {
  repairRecord = {
    scheduledDate: '',
    repairDescription: '',
    cost: null,
    carId: '',
    masterId: '',
  };

  cars: any[] = [];

  constructor(
    private repairRecordService: RepairRecordService,
    private carService: CarService,
    private router: Router)
  {}

  ngOnInit(): void {
    this.loadCars();
  }

  loadCars(): void {
    const userId = sessionStorage.getItem('userId');
    this.carService.getCars().subscribe({
      next: (data) => {
        this.cars = data.filter((car) => car.user.userId === userId);
      },
      error: (err) => {
        console.error('Помилка завантаження автомобілів:', err);
      },
    });
  }

  resetForm(): void {
    this.repairRecord = {
      scheduledDate: '',
      repairDescription: '',
      cost: null,
      carId: '',
      masterId: ''
    };
  }

  createRepairRecord(): void {
    this.repairRecordService.createRepairRecord(this.repairRecord).subscribe({
      next: () => {
        alert('Запис успішно додано!');
        this.resetForm();
        this.router.navigate(['/userMain']);
      },
      error: (err) => {
        console.error('Помилка створення запису:', err);
        alert('Сталася помилка при створенні запису.');
      },
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
