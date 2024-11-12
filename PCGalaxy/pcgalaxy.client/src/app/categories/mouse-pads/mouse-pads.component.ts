import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product.model';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-mouse-pads',
  templateUrl: './mouse-pads.component.html',
  styleUrl: './mouse-pads.component.css'
})
export class MousePadsComponent implements OnInit {
  public products: Product[] = [];
  
  constructor(private productsService: ProductsService) { }

  ngOnInit(): void {
    this.getProductsByCategory(13);
  }

  getProductsByCategory(categoryId: number): void {
    this.productsService.getProductsByCategory(categoryId).subscribe({
      next: (result: Product[]) => {
        this.products = result;
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  addToCart(product: Product): void {
    console.log('Product added to cart:', product);
  }

  addToWishlist(product: Product): void {
    console.log('Product added to wishlist:', product);
  }
}