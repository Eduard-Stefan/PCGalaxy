import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Register } from '../models/register.model';
import { Observable } from 'rxjs';
import { Login } from '../models/login.model';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) { }

  register(model: Register): Observable<Register> {
    return this.http.post<Register>(`${this.apiUrl}/account/register`, model, { withCredentials: true });
  }

  login(model: Login): Observable<Login> {
    return this.http.post<Login>(`${this.apiUrl}/account/login`, model, { withCredentials: true });
  }

  logout(): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/account/logout`, null, { withCredentials: true });
  }

  isSignedIn(): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}/account/is-signed-in`, { withCredentials: true });
  }

  getCurrentUser(): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/account/current-user`, { withCredentials: true });
  }

  getCurrentUserRole(): Observable<string> {
    return this.http.get(`${this.apiUrl}/account/current-user/role`, { responseType: 'text', withCredentials: true });
  }
}
