import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  private apiUrl = 'http://localhost:5122/api/Car';

  constructor(private http: HttpClient) {}

  getCars(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  addCar(car: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, car);
  }

  updateCar(id: string, carData: any): Observable<any> {
    return this.http.put(`http://localhost:5122/api/Car/${id}`, carData, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    });
  }

  deleteCar(carId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${carId}`);
  }
}
