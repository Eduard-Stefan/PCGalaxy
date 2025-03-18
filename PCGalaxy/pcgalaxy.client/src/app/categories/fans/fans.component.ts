import { Component, OnInit } from '@angular/core';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { Product } from '../../models/product.model';
import { ProductsService } from '../../services/products.service';
import { WishlistItemsService } from '../../services/wishlist-items.service';
import { AccountService } from '../../services/account.service';
import { User } from '../../models/user.model';
import { WishlistItem } from '../../models/wishlistItem.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CartItem } from '../../models/cartItem.model';
import { CartItemsService } from '../../services/cart-items.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-fans',
  templateUrl: './fans.component.html',
  styleUrl: './fans.component.css',
  animations: [
    trigger('filterPanelAnimation', [
      state(
        'collapsed',
        style({
          height: '0',
          overflow: 'hidden',
          opacity: 0,
        })
      ),
      state(
        'expanded',
        style({
          height: '*',
          opacity: 1,
        })
      ),
      transition('collapsed <=> expanded', [animate('300ms ease-in-out')]),
    ]),
  ],
})
export class FansComponent implements OnInit {
  public currentUser: User | undefined;
  public products: Product[] = [];
  public filteredProducts: Product[] = [];
  public suppliers: string[] = [];
  public deliveryMethods: string[] = [];
  public filters = {
    minPrice: null,
    maxPrice: null,
    inStock: false,
    supplier: '',
    deliveryMethod: '',
  };

  public filterPanelOpen = false;
  public searchSpec: string = '';
  public categoryId: number = 9;

  constructor(
    private productsService: ProductsService,
    private wishlistItemsService: WishlistItemsService,
    private cartItemsService: CartItemsService,
    private accountService: AccountService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getProductsByCategory(this.categoryId);
  }

  getProductsByCategory(categoryId: number): void {
    this.productsService.getProductsByCategory(categoryId).subscribe({
      next: (result: Product[]) => {
        this.products = result;
        this.filteredProducts = [...this.products];
        this.extractFilters();
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  extractFilters(): void {
    const uniqueSuppliers = new Set(
      this.products.map((product) => product.supplier)
    );
    this.suppliers = Array.from(uniqueSuppliers);

    const uniqueDeliveryMethods = new Set(
      this.products.map((product) => product.deliveryMethod)
    );
    this.deliveryMethods = Array.from(uniqueDeliveryMethods);
  }

  toggleFilterPanel(): void {
    this.filterPanelOpen = !this.filterPanelOpen;
  }

  applyFilters(): void {
    this.filteredProducts = this.products.filter((product) => {
      const matchesPrice =
        (!this.filters.minPrice || product.price >= this.filters.minPrice) &&
        (!this.filters.maxPrice || product.price <= this.filters.maxPrice);
      const matchesStock = !this.filters.inStock || product.stock > 0;
      const matchesSupplier =
        !this.filters.supplier || product.supplier === this.filters.supplier;
      const matchesDelivery =
        !this.filters.deliveryMethod ||
        product.deliveryMethod === this.filters.deliveryMethod;

      return matchesPrice && matchesStock && matchesSupplier && matchesDelivery;
    });

    this.toggleFilterPanel();
  }

  resetFilters(): void {
    this.filters = {
      minPrice: null,
      maxPrice: null,
      inStock: false,
      supplier: '',
      deliveryMethod: '',
    };
    this.filteredProducts = [...this.products];
  }

  isMinPriceGreaterThanMaxPrice(): boolean {
    if (this.filters.minPrice !== null && this.filters.maxPrice !== null) {
      if (this.filters.minPrice > this.filters.maxPrice) {
        return true;
      }
    }
    return false;
  }

  isFormValid(): boolean {
    if (this.isMinPriceGreaterThanMaxPrice()) {
      return false;
    }
    if (
      this.filters.minPrice !== null &&
      (this.filters.minPrice < 0 || this.filters.minPrice > 1000000)
    ) {
      return false;
    }
    if (
      this.filters.maxPrice !== null &&
      (this.filters.maxPrice < 0 || this.filters.maxPrice > 1000000)
    ) {
      return false;
    }
    return true;
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

  onSearchSpec(): void {
    if (this.searchSpec.trim()) {
      this.router.navigate(['/search-in-specs'], {
        queryParams: { term: this.searchSpec, categoryId: this.categoryId },
      });
    }
  }
}
