import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../services/products.service';
import { Product } from '../models/product.model';
import { Location } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from '../models/user.model';
import { WishlistItem } from '../models/wishlistItem.model';
import { AccountService } from '../services/account.service';
import { WishlistItemsService } from '../services/wishlist-items.service';
import { CartItemsService } from '../services/cart-items.service';
import { CartItem } from '../models/cartItem.model';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrl: './view-product.component.css'
})
export class ViewProductComponent {
  currentUser: User | undefined;
  product: Product | null = null;

  constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService,
    private location: Location,
    private wishlistItemsService: WishlistItemsService,
    private cartItemsService: CartItemsService,
    private accountService: AccountService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    const productId = String(this.route.snapshot.paramMap.get('id'));
    this.productsService.getProductById(productId).subscribe({
      next: (product) => (this.product = product),
      error: (err) => console.error(err),
    });
  }

  goBack(): void {
    this.location.back();
  }
  
  addToCart(product: Product): void {
    this.accountService.getCurrentUser().subscribe({
      next: (user: User) => {
        this.currentUser = user;
        if (this.currentUser?.id) {
          this.cartItemsService.getCartItemsByUserId(this.currentUser.id).subscribe({
            next: (cartItems: CartItem[]) => {
              this.cartItemsService.createCartItem({
                id: undefined,
                productId: product.id,
                product: undefined,
                userId: this.currentUser!.id
              }).subscribe({
                next: () => {
                  this.snackBar.open('Product added to cart', 'Close', {
                    duration: 3000,
                  });
                },
                error: (err) => {
                  console.error(err);
                },
              });
            },
            error: (err) => {
              console.error(err);
            },
          });
        }
        else {
          this.snackBar.open('You must be logged in to add products to your cart', 'Close', {
            duration: 3000,
          });
        }
      }
    });
  }

  addToWishlist(product: Product): void {
    this.accountService.getCurrentUser().subscribe({
      next: (user: User) => {
        this.currentUser = user;
        if (this.currentUser?.id) {
          this.wishlistItemsService.getWishlistItemsByUserId(this.currentUser.id).subscribe({
            next: (wishlistItems: WishlistItem[]) => {
              if (wishlistItems.some((item) => item.productId === product.id)) {
                this.snackBar.open('Product already in wishlist', 'Close', {
                  duration: 3000,
                });
                return;
              }
              this.wishlistItemsService.createWishlistItem({
                id: undefined,
                productId: product.id,
                product: undefined,
                userId: this.currentUser!.id
              }).subscribe({
                next: () => {
                  this.snackBar.open('Product added to wishlist', 'Close', {
                    duration: 3000,
                  });
                },
                error: (err) => {
                  console.error(err);
                },
              });
            },
            error: (err) => {
              console.error(err);
            },
          });
        }
        else {
          this.snackBar.open('You must be logged in to add products to your wishlist', 'Close', {
            duration: 3000,
          });
        }
      }
    });
  }
}
