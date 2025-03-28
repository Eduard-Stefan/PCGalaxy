import { Component, OnInit } from '@angular/core';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../models/product.model';
import { ProductsService } from '../services/products.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CartItem } from '../models/cartItem.model';
import { User } from '../models/user.model';
import { WishlistItem } from '../models/wishlistItem.model';
import { AccountService } from '../services/account.service';
import { CartItemsService } from '../services/cart-items.service';
import { WishlistItemsService } from '../services/wishlist-items.service';
import { ProductSearchResult } from '../models/productSearchResult.model';

@Component({
  selector: 'app-search-in-specs',
  templateUrl: './search-in-specs.component.html',
  styleUrl: './search-in-specs.component.css',
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
export class SearchInSpecsComponent implements OnInit {
  public products: ProductSearchResult[] = [];
  public searchTerm: string = '';
  public noResults: boolean = false;
  public currentUser: User | undefined;
  public filteredProducts: ProductSearchResult[] = [];
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
  categoryId: number | undefined;
  ascending: boolean = false;

  constructor(
    private productsService: ProductsService,
    private route: ActivatedRoute,
    private wishlistItemsService: WishlistItemsService,
    private cartItemsService: CartItemsService,
    private accountService: AccountService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.searchTerm = params['term'] || '';
      this.categoryId = params['categoryId'] || undefined;
      this.ascending = params['ascending'] === 'true' ? true : false;
      if (this.searchTerm) {
        this.fetchSearchResults(this.searchTerm, this.categoryId, this.ascending);
      }
    });
  }

  fetchSearchResults(term: string, categoryId: number | undefined, ascending: boolean): void {
    this.productsService.searchInSpecs(term, categoryId, ascending).subscribe({
      next: (result: ProductSearchResult[]) => {
        this.products = result;
        this.noResults = this.products.length === 0;
        this.filteredProducts = [...this.products];
        this.extractFilters();
      },
      error: (err) => console.error('Search error:', err),
    });
  }

  extractFilters(): void {
    const uniqueSuppliers = new Set(
      this.products.map((product) => product.product.supplier)
    );
    this.suppliers = Array.from(uniqueSuppliers);

    const uniqueDeliveryMethods = new Set(
      this.products.map((product) => product.product.deliveryMethod)
    );
    this.deliveryMethods = Array.from(uniqueDeliveryMethods);
  }

  toggleFilterPanel(): void {
    this.filterPanelOpen = !this.filterPanelOpen;
  }

  applyFilters(): void {
    this.filteredProducts = this.products.filter((product) => {
      const matchesPrice =
        (!this.filters.minPrice || product.product.price >= this.filters.minPrice) &&
        (!this.filters.maxPrice || product.product.price <= this.filters.maxPrice);
      const matchesStock = !this.filters.inStock || product.product.stock > 0;
      const matchesSupplier =
        !this.filters.supplier || product.product.supplier === this.filters.supplier;
      const matchesDelivery =
        !this.filters.deliveryMethod ||
        product.product.deliveryMethod === this.filters.deliveryMethod;

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
          this.cartItemsService
            .getCartItemsByUserId(this.currentUser.id)
            .subscribe({
              next: (cartItems: CartItem[]) => {
                this.cartItemsService
                  .createCartItem({
                    id: undefined,
                    productId: product.id,
                    product: undefined,
                    userId: this.currentUser!.id,
                  })
                  .subscribe({
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
        } else {
          this.snackBar.open(
            'You must be logged in to add products to your cart',
            'Close',
            {
              duration: 3000,
            }
          );
        }
      },
    });
  }

  addToWishlist(product: Product): void {
    this.accountService.getCurrentUser().subscribe({
      next: (user: User) => {
        this.currentUser = user;
        if (this.currentUser?.id) {
          this.wishlistItemsService
            .getWishlistItemsByUserId(this.currentUser.id)
            .subscribe({
              next: (wishlistItems: WishlistItem[]) => {
                if (
                  wishlistItems.some((item) => item.productId === product.id)
                ) {
                  this.snackBar.open('Product already in wishlist', 'Close', {
                    duration: 3000,
                  });
                  return;
                }
                this.wishlistItemsService
                  .createWishlistItem({
                    id: undefined,
                    productId: product.id,
                    product: undefined,
                    userId: this.currentUser!.id,
                  })
                  .subscribe({
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
        } else {
          this.snackBar.open(
            'You must be logged in to add products to your wishlist',
            'Close',
            {
              duration: 3000,
            }
          );
        }
      },
    });
  }

  toggleAscending(): void {
    this.ascending = !this.ascending;
    this.fetchSearchResults(this.searchTerm, this.categoryId, this.ascending);
  }
  
}
