import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminRepairRecordsComponent } from './admin-repair-records.component';

describe('AdminRepairRecordsComponent', () => {
  let component: AdminRepairRecordsComponent;
  let fixture: ComponentFixture<AdminRepairRecordsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminRepairRecordsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminRepairRecordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
