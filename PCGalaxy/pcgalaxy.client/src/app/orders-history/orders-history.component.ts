import { Component, OnInit } from '@angular/core';
import { OrderService } from '../services/order.service';
import { User } from '../models/user.model';
import { AccountService } from '../services/account.service';
import { Order } from '../models/order.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-orders-history',
  templateUrl: './orders-history.component.html',
  styleUrl: './orders-history.component.css',
})
export class OrdersHistoryComponent implements OnInit {
  currentUser: User | undefined;
  orders: Order[] = [];
  displayedColumns: string[] = [
    'createdAt',
    'deliveryAddress',
    'coupon',
    'subtotal',
    'discount',
    'deliveryFee',
    'total',
  ];

  constructor(
    private accountService: AccountService,
    private orderService: OrderService,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const message = params['message'];
      if (message) {
        this.snackBar.open(message, 'Close', {
          duration: 3000,
        });
      }
    });
    this.accountService.getCurrentUser().subscribe({
      next: (user: User) => {
        this.currentUser = user;
        if (this.currentUser?.id) {
          this.getOrders(this.currentUser.id);
        }
      },
    });
  }

  getOrders(userId: string): void {
    this.orderService.getOrdersByUserId(userId).subscribe({
      next: (result) => {
        this.orders = result;
      },
      error: (err) => console.error(err),
    });
  }
}
