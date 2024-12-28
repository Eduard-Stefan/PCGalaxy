import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CartItem } from '../models/cartItem.model';
import { Product } from '../models/product.model';
import { User } from '../models/user.model';
import { AccountService } from '../services/account.service';
import { CartItemsService } from '../services/cart-items.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {
  cartId: string = '';
  cartItems: CartItem[] = [];
  currentUser: User | undefined;
  product: Product | undefined;
  deliveryFee: number = 5;
  total: number = 0;

  constructor(
    private cartItemsService: CartItemsService,
    private accountService: AccountService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.accountService.getCurrentUser().subscribe({
      next: (user: User) => {
        this.currentUser = user;
        if (this.currentUser?.id) {
          this.getCartItemsByUserId(this.currentUser.id);
        }
      },
    });
  }

  getCartItemsByUserId(userId: string): void {
    this.cartItemsService.getCartItemsByUserId(userId).subscribe({
      next: (result: CartItem[]) => {
        this.cartItems = result;
        this.total = this.cartItems.reduce((acc, item) => acc + item.product!.price, 0);
        this.total += this.deliveryFee;
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  deleteCartItem(id: string): void {
    this.cartItemsService.deleteCartItem(id).subscribe({
      next: () => {
        this.getCartItemsByUserId(this.currentUser!.id);
        this.snackBar.open('Item removed from cart', 'Close', {
          duration: 3000,
        });
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
}
