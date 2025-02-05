import { Component, OnInit } from '@angular/core';
import { RepairRecordService } from '../../services/repair-record.service';
import {NgForOf, NgIf} from '@angular/common';
import {Router, RouterLink, RouterLinkActive} from '@angular/router';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-admin-main',
  templateUrl: './admin-main.component.html',
  imports: [
    RouterLink,
    NgForOf,
    RouterLinkActive,
    FormsModule,
    NgIf
  ],
  styleUrls: ['./admin-main.component.css']
})

export class AdminMainComponent implements OnInit {
  activeOrders = 0;
  completedRepairs = 0;
  canceledRepairs = 0;
  latestOrders: any[] = [];
  allRecords: any[] = [];
  selectedDate: string = '';
  noRecordsFound: boolean = false;

  constructor(
    private repairRecordService: RepairRecordService,
    private router: Router
  ) {}

  ngOnInit() {
    this.fetchAllRepairRecords();
  }

  fetchAllRepairRecords() {
    this.repairRecordService.getRepairRecords().subscribe((records: any[]) => {
      if (!records) return;

      this.allRecords = records;

      this.activeOrders = records.filter(record => record.status === 'В обробці').length;
      this.completedRepairs = records.filter(record => record.status === 'Виконано').length;
      this.canceledRepairs = records.filter(record => record.status === 'Скасовано').length;

      this.latestOrders = this.formatOrders(records);
      this.noRecordsFound = this.latestOrders.length === 0;
    });
  }

  filterByStatus(status: string) {
    if (status === 'all') {
      this.latestOrders = this.formatOrders(this.allRecords);
    } else {
      this.repairRecordService.getRepairRecordsByStatus(status).subscribe((filteredRecords: any[]) => {
        if (!filteredRecords) return;
        this.latestOrders = this.formatOrders(filteredRecords);
      });
    }
  }

  filterByDate(date: string) {
    this.repairRecordService.getRepairRecordsByDate(date).subscribe((filteredRecords: any[]) => {
      if (!filteredRecords) return;
      this.latestOrders = this.formatOrders(filteredRecords);
      this.noRecordsFound = this.latestOrders.length === 0;
    });
  }

  onDateChange(event: any) {
    const selectedDate = event.target.value;
    if (selectedDate) {
      this.filterByDate(selectedDate);
    } else {
      this.fetchAllRepairRecords();
    }
  }

  resetFilters() {
    this.selectedDate = '';
    this.fetchAllRepairRecords();
  }

  formatOrders(records: any[]) {
    if (!records || records.length === 0) return [];

    return records
      .sort((a, b) => new Date(b.scheduledDate).getTime() - new Date(a.scheduledDate).getTime())
      .map(record => ({
        orderNumber: record.id,
        car: record.car ? `${record.car.make} ${record.car.model}` : 'Невідоме авто',
        carNumber: record.car?.number || 'Немає номеру',
        master: record.master
          ? `${record.master.name} ${record.master.surname} (${record.master.specialization})`
          : 'Невідомий майстер',
        cost: `${record.cost}₴`,
        status: record.status || 'Невідомий статус',
        scheduledDate: record.scheduledDate ? new Date(record.scheduledDate).toLocaleDateString() : 'Немає дати',
        repairDescription: record.repairDescription || 'Немає опису'
      }));
  }

  logout(): void {
    const confirmLogout = window.confirm("Ви дійсно хочете вийти з акаунту?");
    if (confirmLogout) {
      localStorage.clear();
      this.router.navigate(['/login']);
    }
  }
}

