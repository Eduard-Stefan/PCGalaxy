import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Order } from '../models/order.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getOrderById(orderId: string): Observable<Order> {
    return this.http.get<Order>(`${this.apiUrl}/orders/${orderId}`, { withCredentials: true });
  }

  getOrdersByUserId(userId: string): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.apiUrl}/orders/user/${userId}`, { withCredentials: true });
  }

  createOrder(order: Order): Observable<Order> {
    return this.http.post<Order>(`${this.apiUrl}/orders`, order, { withCredentials: true });
  }
}
