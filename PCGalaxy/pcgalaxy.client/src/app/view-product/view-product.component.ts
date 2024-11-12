import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../services/products.service';
import { Product } from '../models/product.model';
import { Location } from '@angular/common';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrl: './view-product.component.css'
})
export class ViewProductComponent {
  product: Product | null = null;

  constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService,
    private location: Location
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
    console.log('Product added to cart:', product);
  }

  addToWishlist(product: Product): void {
    console.log('Product added to wishlist:', product);
  }
}
