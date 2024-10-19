import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ProductsService } from '../../services/products.service';
import { v4 as uuidv4 } from 'uuid';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css'],
})
export class CreateProductComponent {
  name: string = '';
  description: string = '';
  specifications: string = '';
  price: number = 0;
  stock: number = 0;
  supplier: string = '';
  deliveryMethod: string = '';
  category: string = '';

  constructor(
    private productsService: ProductsService,
    public dialogRef: MatDialogRef<CreateProductComponent>
  ) {}

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    const productId: string = uuidv4();
    const trimmedName: string = this.name.trim().replace(/\s+/g, ' ');
    const trimmedDescription: string = this.description.trim().replace(/\s+/g, ' ');
    const trimmedSpecifications: string = this.specifications.trim().replace(/\s+/g, ' ');
    const trimmedSupplier: string = this.supplier.trim().replace(/\s+/g, ' ');
    const trimmedDeliveryMethod: string = this.deliveryMethod.trim().replace(/\s+/g, ' ');
    const trimmedCategory: string = this.category.trim().replace(/\s+/g, ' ');
    const product: Product = {
      id: productId,
      name: trimmedName,
      description: trimmedDescription,
      specifications: trimmedSpecifications,
      price: this.price,
      stock: this.stock,
      supplier: trimmedSupplier,
      deliveryMethod: trimmedDeliveryMethod,
      category: trimmedCategory,
    };

    this.productsService.createProduct(product).subscribe({
      next: (response) => {
        this.dialogRef.close(response);
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  isNameWhitespace(): boolean {
    return this.name.length > 0 && this.name.trim().length === 0;
  }

  isDescriptionWhitespace(): boolean {
    return this.description.length > 0 && this.description.trim().length === 0;
  }

  isSpecificationsWhitespace(): boolean {
    return this.specifications.length > 0 && this.specifications.trim().length === 0;
  }

  isSupplierWhitespace(): boolean {
    return this.supplier.length > 0 && this.supplier.trim().length === 0;
  }

  isDeliveryMethodWhitespace(): boolean {
    return this.deliveryMethod.length > 0 && this.deliveryMethod.trim().length === 0;
  }

  isCategoryWhitespace(): boolean {
    return this.category.length > 0 && this.category.trim().length === 0;
  }

  isNameTooLong(): boolean {
    return this.name.length > 256;
  }

  isDescriptionTooLong(): boolean {
    return this.description.length > 1024;
  }

  isSpecificationsTooLong(): boolean {
    return this.specifications.length > 1024;
  }

  isSupplierTooLong(): boolean {
    return this.supplier.length > 256;
  }

  isDeliveryMethodTooLong(): boolean {
    return this.deliveryMethod.length > 256;
  }

  isCategoryTooLong(): boolean {
    return this.category.length > 256;
  }

  isPriceTooLarge(): boolean {
    return this.price > 1000000;
  }

  isStockTooLarge(): boolean {
    return this.stock > 1000000;
  }

  isStockInteger(): boolean {
    return Number.isInteger(this.stock);
  }
}
