import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product.model';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-headsets',
  templateUrl: './headsets.component.html',
  styleUrl: './headsets.component.css'
})
export class HeadsetsComponent implements OnInit {
  public products: Product[] = [];
  
  constructor(private productsService: ProductsService) { }

  ngOnInit(): void {
    this.getProductsByCategory(14);
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
