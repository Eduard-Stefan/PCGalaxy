import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { CartItem } from '../models/cartItem.model';

@Injectable({
  providedIn: 'root'
})
export class CartItemsService {
  private apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getCartItemsByUserId(userId: string): Observable<CartItem[]> {
    return this.http.get<CartItem[]>(`${this.apiUrl}/CartItems/${userId}`, { withCredentials: true });
  }

  createCartItem(cartItem: CartItem): Observable<CartItem> {
    return this.http.post<CartItem>(`${this.apiUrl}/CartItems`, cartItem, { withCredentials: true });
  }

  deleteCartItem(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/CartItems/${id}`, { withCredentials: true });
  }
}
