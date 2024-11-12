import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../models/product.model';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  public products: Product[] = [];
  public searchTerm: string = '';
  public noResults: boolean = false;

  constructor(private productsService: ProductsService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.searchTerm = params['term'] || '';
      if (this.searchTerm) {
        this.fetchSearchResults(this.searchTerm);
      }
    });
  }

  fetchSearchResults(term: string): void {
    this.productsService.searchProducts(term).subscribe({
      next: (result: Product[]) => {
        this.products = result;
        this.noResults = this.products.length === 0;
      },
      error: (err) => console.error('Search error:', err)
    });
  }

  addToCart(product: Product): void {
    console.log('Product added to cart:', product);
  }

  addToWishlist(product: Product): void {
    console.log('Product added to wishlist:', product);
  }
}
