import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RepairRecordService {
  private apiUrl = 'http://localhost:5122/api/RepairRecord';

  constructor(private http: HttpClient) {}

  createRepairRecord(repairRecord: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, repairRecord);
  }

  getRepairRecordsByStatus(status: string): Observable<any[]> {
    const params = new HttpParams().set('status', status);
    return this.http.get<any[]>(`${this.apiUrl}/filter-by-status`, { params });
  }

  getRepairRecordsByDate(date: string): Observable<any[]> {
    const params = new HttpParams().set('date', date);
    return this.http.get<any[]>(`${this.apiUrl}/filter-by-date`, { params });
  }

  getRepairRecords(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getRepairRecordById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  updateStatus(id: string, newStatus: string): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${id}/change-status`, {
      id: id,
      status: newStatus
    });
  }

  updateCost(id: string, newCost: number): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${id}/change-cost`, {
      id: id,
      cost: newCost
    });
  }
}
