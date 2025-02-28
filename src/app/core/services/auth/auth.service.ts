import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private httpClient: HttpClient) {}
  userData:any;
  private readonly router = inject(Router);

  sendRegisterForm(data: object): Observable<any> {
    return this.httpClient.post(
      `${environment.baseURL}/api/v1/auth/signup`,
      data
    );
  }

  sendLoginForm(data: object): Observable<any> {
    return this.httpClient.post(
      `${environment.baseURL}/api/v1/auth/signin`,
      data
    );
  }
  getUserData() {
    this.userData = jwtDecode(localStorage.getItem('token')!);
    console.log(this.userData);
  }
  removeUserDate() {
    this.userData = null;
    localStorage.removeItem('token');
    setTimeout(() => {
      this.router.navigate(['/login']);
    }, 500);
  }
}
