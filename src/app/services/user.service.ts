import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:5122/api/EditUser/getAllUsers';
  private editUserUrl = 'http://localhost:5122/api/EditUser/editUser/';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  editUser(userId: string | null, userData: any): Observable<any> {
    userId = sessionStorage.getItem('userId');
    const url = `${this.editUserUrl}${userId}`;
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.put(url, userData, { headers });
  }
}
