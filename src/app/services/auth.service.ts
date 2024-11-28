import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loginUrl = 'http://localhost:5122/api/Auth/login';
  private registerUrl = 'http://localhost:5122/api/Registration/register';

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<{
    token: string;
    role: string;
    userId: string;
    name: string;
    surname: string;
    email: string;
    phone: string;
  }> {
    const body = { username, password };
    const headers = { 'Content-Type': 'application/json' };

    return this.http.post<{
      token: string;
      role: string;
      userId: string;
      name: string;
      surname: string;
      email: string;
      phone: string;
    }>(this.loginUrl, body, { headers }).pipe(
      catchError(this.handleError.bind(this))
    );
  }

  register(user: {
    password: string;
    surname: string;
    name: string;
    phoneNumber: string;
    email: string;
    username: string
  }): Observable<any> {
    const headers = { 'Content-Type': 'application/json' };
    return this.http.post(this.registerUrl, user, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 400 && error.error === 'Користувач уже існує.') {
      alert('Користувач вже існує!');
      return throwError('Користувач вже існує!');
    }
    else if (error.status === 400 && error.error === 'Користувач уже існує.') {
      alert('Користувач вже існує!');
      return throwError('Користувач вже існує!');
    }
    else if (error.status === 400) {
      return throwError('Невірний запит. Будь ласка, перевірте введені дані.');
    } else if (error.status === 401) {
      alert('Невірний логін або пароль.\nСпробуйте ще раз.');
      return throwError('Невірний логін або пароль. Спробуйте ще раз.');
    } else {
      return throwError('Сталася помилка. Спробуйте пізніше.');
    }
  }
}
