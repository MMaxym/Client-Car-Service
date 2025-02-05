import { Component, OnInit } from '@angular/core';
import { DatePipe, NgForOf, NgIf } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { RepairRecordService } from '../../services/repair-record.service';

@Component({
  selector: 'app-admin-repair-records',
  imports: [
    NgForOf,
    NgIf,
    ReactiveFormsModule,
    RouterLink,
    RouterLinkActive,
    DatePipe,
    FormsModule
  ],
  templateUrl: './admin-repair-records.component.html',
  styleUrls: ['./admin-repair-records.component.css']
})
export class AdminRepairRecordsComponent implements OnInit {
  repairRecord: any = null;
  searchId: string = '';
  errorMessage: string = '';

  constructor(
    private repairRecordService: RepairRecordService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  findRepairRecord(): void {
    if (!this.searchId.trim()) {
      this.errorMessage = 'Будь ласка, введіть ID запису.';
      this.repairRecord = null;
      return;
    }

    this.repairRecordService.getRepairRecordById(this.searchId).subscribe({
      next: (data) => {
        this.repairRecord = data;
        this.errorMessage = '';
      },
      error: () => {
        this.errorMessage = 'Запис не знайдено!';
        this.repairRecord = null;
      }
    });
  }

  updateStatus(): void {
    if (!this.repairRecord || !this.repairRecord.id) {
      alert('❌ Немає ID запису для оновлення статусу');
      return;
    }

    this.repairRecordService.updateStatus(this.repairRecord.id, this.repairRecord.status).subscribe({
      next: () => alert('✅ Статус успішно оновлено'),
      error: (err) => alert(`❌ Помилка оновлення статусу: ${err.error?.title || 'Невідома помилка'}`)
    });
  }

  updateCost(): void {
    if (!this.repairRecord || !this.repairRecord.id) {
      alert('❌ Немає ID запису для оновлення вартості');
      return;
    }

    this.repairRecordService.updateCost(this.repairRecord.id, this.repairRecord.cost).subscribe({
      next: () => alert('✅ Вартість успішно оновлено'),
      error: (err) => alert(`❌ Помилка оновлення вартості: ${err.error?.title || 'Невідома помилка'}`)
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
