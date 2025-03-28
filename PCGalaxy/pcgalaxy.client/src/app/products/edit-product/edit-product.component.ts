import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../models/product.model';
import { Category } from '../../models/category.model';
import { CategoriesService } from '../../services/categories.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.css',
})
export class EditProductComponent implements OnInit {
  private id: string;
  public name: string = '';
  public description: string = '';
  public specifications: string = '';
  public price: number = 0;
  public stock: number = 0;
  public supplier: string = '';
  public deliveryMethod: string = '';
  public category: Category;
  public categories: Category[] = [];
  public imageBase64: string = '';
  specificationsFileBase64: string = '';
  defaultProductImageBase64: string = environment.defaultProductImageBase64;

  constructor(
    private productsService: ProductsService,
    private categoriesService: CategoriesService,
    private dialogRef: MatDialogRef<EditProductComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Product
  ) {
    this.id = data.id;
    this.name = data.name;
    this.description = data.description;
    this.specifications = data.specifications;
    this.price = data.price;
    this.stock = data.stock;
    this.supplier = data.supplier;
    this.deliveryMethod = data.deliveryMethod;
    this.category = data.category;
    this.imageBase64 = data.imageBase64;
    this.specificationsFileBase64 = data.specificationsFileBase64;
  }

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories(): void {
    this.categoriesService.getCategories().subscribe({
      next: (result: Category[]) => {
        this.categories = result;
        this.category = this.categories.find(c => c.id === this.category.id)!;
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    const trimmedName: string = this.name.trim().replace(/\s+/g, ' ');
    const trimmedDescription: string = this.description.trim().replace(/\s+/g, ' ');
    const trimmedSpecifications: string = this.specifications.trim().replace(/\s+/g, ' ');
    const trimmedSupplier: string = this.supplier.trim().replace(/\s+/g, ' ');
    const trimmedDeliveryMethod: string = this.deliveryMethod.trim().replace(/\s+/g, ' ');
    const product: Product = {
      id: this.id,
      name: trimmedName,
      description: trimmedDescription,
      specifications: trimmedSpecifications,
      price: this.price,
      stock: this.stock,
      supplier: trimmedSupplier,
      deliveryMethod: trimmedDeliveryMethod,
      category: this.category,
      imageBase64: this.imageBase64 || this.defaultProductImageBase64,
      specificationsFileBase64: this.specificationsFileBase64,
    };

    this.productsService.updateProduct(this.id, product).subscribe({
      next: () => {
        this.dialogRef.close(product);
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  onImageSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = reader.result as string;
        const base64ContentArray = base64String.split(',');
        this.imageBase64 = base64ContentArray.length > 1 ? base64ContentArray[1] : base64String;
      };
      reader.readAsDataURL(file);
    }
  }

  onSpecificationsFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = reader.result as string;
        const base64ContentArray = base64String.split(',');
        this.specificationsFileBase64 = base64ContentArray.length > 1 ? base64ContentArray[1] : base64String;
      };
      reader.readAsDataURL(file);
    }
  }

  removeImage(): void {
    this.imageBase64 = '';
  }

  removeSpecificationsFile(): void {
    this.specificationsFileBase64 = '';
  }

  isNoImage(): boolean {
    return this.imageBase64.length === 0 || this.imageBase64 === this.defaultProductImageBase64;
  }

  isNoSpecificationsFile(): boolean {
    return this.specificationsFileBase64.length === 0;
  }

  isImageTooLarge(): boolean {
    return this.imageBase64.length > 1024 * 1024;
  }

  isSpecificationsFileTooLarge(): boolean {
    return this.specificationsFileBase64.length > 1024 * 1024;
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
