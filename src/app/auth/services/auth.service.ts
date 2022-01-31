import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { CurrentUser } from 'src/app/shared/models/CurrentUser';
import { environment } from 'src/environments/environment';
import { AuthResponse } from '../models/authResponse';
import { LoginRequest } from '../models/loginRequest';
import { RegisterRequest } from '../models/registerRequest';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl: string;

  constructor(private readonly http: HttpClient) {
    this.apiUrl = environment.apiUrl;
  }

  public getUser(res: AuthResponse): CurrentUser {
    return res.user;
  }

  public register(data: RegisterRequest): Observable<CurrentUser> {
    return this.http
      .post<AuthResponse>(`${this.apiUrl}/users`, data)
      .pipe(map(this.getUser));
  }

  public login(data: LoginRequest): Observable<CurrentUser> {
    return this.http
      .post<AuthResponse>(`${this.apiUrl}/users/login`, data)
      .pipe(map(this.getUser));
  }

  public getCurrentUser(): Observable<CurrentUser> {
    return this.http
      .get<AuthResponse>(`${this.apiUrl}/user`)
      .pipe(map(this.getUser));
  }

  public updateCurrentUser(data: CurrentUser): Observable<CurrentUser> {
    return this.http
      .put<AuthResponse>(`${this.apiUrl}/user`, data)
      .pipe(map(this.getUser));
  }
}
