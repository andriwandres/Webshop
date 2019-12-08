import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginDto } from 'src/models/auth/login';
import { RegisterDto } from 'src/models/auth/register';
import { AuthenticatedUser } from 'src/models/auth/user';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private readonly http: HttpClient) { }

  login(model: LoginDto): Observable<AuthenticatedUser> {
    const url = `${environment.api.auth}/Login`;

    return this.http.post<AuthenticatedUser>(url, model);
  }

  register(model: RegisterDto): Observable<void> {
    const url = `${environment.api.auth}/Register`;

    return this.http.post<void>(url, model);
  }

  checkEmailTaken(email: string): Observable<boolean> {
    const url = `${environment.api.auth}/Register`;
    const options = {
      params: new HttpParams().set('email', email)
    };

    return this.http.get<boolean>(url, options);
  }
}
