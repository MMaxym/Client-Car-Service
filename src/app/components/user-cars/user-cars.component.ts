import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {RepairRecordService} from '../../services/repair-record.service';
import {CarService} from '../../services/car.service';
import {CurrencyPipe, DatePipe, NgClass, NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-user-cars',
  imports: [
    RouterLink,
    RouterLinkActive,
    NgForOf,
    NgIf,
    NgClass,
    DatePipe,
    CurrencyPipe
  ],
  templateUrl: './user-cars.component.html',
  styleUrl: './user-cars.component.css'
})

export class UserCarsComponent {
  constructor(
  private repairRecordService: RepairRecordService,
  private carService: CarService,
  private router: Router
  ) {}

  carsWithRepairs: {
    car: any;
    repairs: any[];
    totalCost: number;
  }[] = [];

  ngOnInit(): void {
    this.loadCarsWithRepairRecords();
  }

  loadCarsWithRepairRecords(): void {
    const userId = sessionStorage.getItem('userId');

    this.carService.getCars().subscribe({
      next: (cars) => {
        const userCars = cars.filter((car) => car.user.userId === userId);

        this.repairRecordService.getRepairRecords().subscribe({
          next: (repairRecords) => {
            const filteredRepairRecords = repairRecords.filter((repairRecord) =>
              userCars.some((car) => car.id === repairRecord.car.id)
            );

            this.carsWithRepairs = userCars.map((car) => {
              const carRepairs = filteredRepairRecords
                .filter((repair) => repair.car.id === car.id)
                .sort((a, b) => new Date(b.scheduledDate).getTime() - new Date(a.scheduledDate).getTime());

              const totalCost = carRepairs.reduce((sum, repair) => sum + (repair.cost || 0), 0);

              return {
                car,
                repairs: carRepairs,
                totalCost,
              };
            });
          },
          error: (err) => {
            console.error('Помилка завантаження записів про ремонт:', err);
          },
        });
      },
      error: (err) => {
        console.error('Помилка завантаження автомобілів:', err);
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
