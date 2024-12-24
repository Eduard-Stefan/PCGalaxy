import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { WishlistItem } from '../models/wishlistItem.model';

@Injectable({
  providedIn: 'root',
})
export class WishlistItemsService {
  private apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getWishlistItemsByUserId(userId: string): Observable<WishlistItem[]> {
    return this.http.get<WishlistItem[]>(`${this.apiUrl}/WishlistItems/${userId}`, { withCredentials: true });
  }

  createWishlistItem(wishlistItem: WishlistItem): Observable<WishlistItem> {
    return this.http.post<WishlistItem>(`${this.apiUrl}/WishlistItems`, wishlistItem, { withCredentials: true });
  }

  deleteWishlistItem(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/WishlistItems/${id}`, { withCredentials: true });
  }
}
