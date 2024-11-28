import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RepairRecordService {
  private apiUrl = 'http://localhost:5122/api/RepairRecord';

  constructor(private http: HttpClient) { }

  getRepairRecords(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  createRepairRecord(repairRecord: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, repairRecord);
  }
}
