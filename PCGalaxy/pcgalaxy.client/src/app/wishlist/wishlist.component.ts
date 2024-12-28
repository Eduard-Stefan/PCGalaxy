import { Component, OnInit } from '@angular/core';
import { WishlistItemsService } from '../services/wishlist-items.service';
import { WishlistItem } from '../models/wishlistItem.model';
import { AccountService } from '../services/account.service';
import { User } from '../models/user.model';
import { Product } from '../models/product.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.css',
})
export class WishlistComponent implements OnInit {
  wishlistId: string = '';
  wishlistItems: WishlistItem[] = [];
  currentUser: User | undefined;
  product: Product | undefined;

  constructor(
    private wishlistItemsService: WishlistItemsService,
    private accountService: AccountService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.accountService.getCurrentUser().subscribe({
      next: (user: User) => {
        this.currentUser = user;
        if (this.currentUser?.id) {
          this.getWishlistItemsByUserId(this.currentUser.id);
        }
      },
    });
  }

  getWishlistItemsByUserId(userId: string): void {
    this.wishlistItemsService.getWishlistItemsByUserId(userId).subscribe({
      next: (result: WishlistItem[]) => {
        this.wishlistItems = result;
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  deleteWishlistItem(id: string): void {
    this.wishlistItemsService.deleteWishlistItem(id).subscribe({
      next: () => {
        this.getWishlistItemsByUserId(this.currentUser!.id);
        this.snackBar.open('Item removed from wishlist', 'Close', {
          duration: 3000,
        });
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  addToCart(product: Product): void {
    console.log('Product added to cart:', product);
  }
}
