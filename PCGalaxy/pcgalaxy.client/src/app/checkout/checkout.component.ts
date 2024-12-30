import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CartItemsService } from '../services/cart-items.service';
import { User } from '../models/user.model';
import { AccountService } from '../services/account.service';
import { OrderService } from '../services/order.service';
import { Order } from '../models/order.model';
import { Location } from '@angular/common';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  deliveryAddress: string = '';
  cardNumber: string = '';
  expiryDate: string = '';
  cvv: string = '';
  couponCode: string = '';
  discount: number = 0;
  subtotal: number = 0;
  deliveryFee: number = 5;
  total: number = 0;
  discountMessage: string = '';
  currentUser: User | undefined;

  constructor(
    private accountService: AccountService,
    private cartItemsService: CartItemsService,
    private orderService: OrderService,
    private router: Router,
    private snackBar: MatSnackBar,
    private location: Location
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
      next: (items) => {
        if (items.length === 0) {
          this.router.navigate(['/cart']);
          return;
        }
        this.subtotal = items.reduce(
          (acc, item) => acc + item.product!.price,
          0
        );
        this.calculateTotal();
      },
      error: (err) => console.error(err),
    });
  }

  applyCoupon(): void {
    if (this.couponCode === 'SAVE10') {
      this.discount = 10;
      this.discountMessage = 'Coupon applied successfully. You saved $10!';
    } else {
      this.discountMessage = 'Invalid coupon code.';
      this.discount = 0;
    }
    this.calculateTotal();
  }

  calculateTotal(): void {
    this.total = this.subtotal - this.discount + this.deliveryFee;
  }

  onSubmit(): void {
    const finalCouponCode =
      this.discountMessage === 'Invalid coupon code.' ? '' : this.couponCode;

    var order: Order = {
      id: undefined,
      userId: this.currentUser!.id,
      createdAt: undefined,
      orderItems: undefined,
      deliveryAddress: this.deliveryAddress,
      coupon: finalCouponCode,
      subtotal: this.subtotal,
      discount: this.discount,
      deliveryFee: this.deliveryFee,
      total: this.total,
      cardNumber: this.cardNumber,
      cardExpiryDate: this.expiryDate,
      cardCvv: this.cvv,
    };

    this.orderService.createOrder(order).subscribe({
      next: () => {
        this.router.navigate(['/orders-history'], {
          queryParams: { message: 'Order placed successfully!' },
        });
      },
      error: () => {
        this.snackBar.open(
          'Failed to place order. Your card may not be valid!',
          'Close',
          {
            duration: 3000,
          }
        );
      },
    });
  }

  formatExpiryDate(): void {
    this.expiryDate = this.expiryDate.replace(/\D/g, '');
    if (this.expiryDate.length >= 2) {
      this.expiryDate =
        `${this.expiryDate.slice(0, 2)}/` + this.expiryDate.slice(2, 4);
    }
  }

  goBack(): void {
    this.location.back();
  }
}
