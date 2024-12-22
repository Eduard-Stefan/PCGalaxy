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

@Component({
  selector: 'app-headsets',
  templateUrl: './headsets.component.html',
  styleUrl: './headsets.component.css',
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
export class HeadsetsComponent implements OnInit {
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

  constructor(private productsService: ProductsService) {}

  ngOnInit(): void {
    this.getProductsByCategory(14);
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
    if (this.filters.minPrice !== null && (this.filters.minPrice < 0 || this.filters.minPrice > 1000000)) {
      return false;
    }
    if (this.filters.maxPrice !== null && (this.filters.maxPrice < 0 || this.filters.maxPrice > 1000000)) {
      return false;
    }
    return true;
  }

  addToCart(product: Product): void {
    console.log('Product added to cart:', product);
  }

  addToWishlist(product: Product): void {
    console.log('Product added to wishlist:', product);
  }
}
