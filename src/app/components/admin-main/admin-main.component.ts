import { Component, OnInit } from '@angular/core';
import { RepairRecordService} from '../../services/repair-record.service';
import {Router, RouterLink, RouterLinkActive} from '@angular/router';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-admin-main',
  templateUrl: './admin-main.component.html',
  imports: [
    RouterLink,
    NgForOf,
    RouterLinkActive
  ],
  styleUrls: ['./admin-main.component.css']
})
export class AdminMainComponent implements OnInit {
  activeOrders = 0;
  completedRepairs = 0;
  mechanicsAvailable = 4;
  latestOrders: any[] = [];

  constructor(
    private repairRecordService: RepairRecordService,
    private router: Router,
    ) {}

  ngOnInit() {
    this.fetchRepairRecords();
  }

  fetchRepairRecords() {
    this.repairRecordService.getRepairRecords().subscribe((records: any[]) => {
      this.activeOrders = records.filter(record => record.status === 'В обробці').length;
      this.completedRepairs = records.filter(record => record.status === 'Виконано').length;

      this.latestOrders = records
        .sort((a, b) => new Date(b.scheduledDate).getTime() - new Date(a.scheduledDate).getTime())
        .slice(0, 7)
        .map(record => ({
          orderNumber: record.id,
          car: `${record.car.make} ${record.car.model}`,
          carNumber: record.car.number,
          master: `${record.master.name} ${record.master.surname}`,
          status: record.status,
          scheduledDate: new Date(record.scheduledDate).toLocaleDateString(),
          repairDescription: record.repairDescription || 'Немає опису'
        }));
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
