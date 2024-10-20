import { Component, OnInit, ViewChild } from '@angular/core';
import { Product } from '../models/product.model';
import { ProductsService } from '../services/products.service';
import { MatDialog } from '@angular/material/dialog';
import { CreateProductComponent } from './create-product/create-product.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent implements OnInit {
  public products: Product[] = [];
  public displayedColumns: string[] = ['name', 'description', 'specifications', 'price', 'stock', 'supplier', 'deliveryMethod', 'category', 'actions'];
  public dataSource!: MatTableDataSource<Product>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private productsService: ProductsService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(): void {
    this.productsService.getProducts().subscribe({
      next: (result: Product[]) => {
        this.products = result;
        this.dataSource = new MatTableDataSource(this.products);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.dataSource.filterPredicate = (data: Product, filter: string) => {
          const dataStr = data.name.toLowerCase() + data.description.toLowerCase() + data.specifications.toLowerCase() + data.price.toString() + data.stock.toString() + data.supplier.toLowerCase() + data.deliveryMethod.toLowerCase() + data.category.name!.toLowerCase();
          return dataStr.includes(filter);
        };
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openEditProductDialog(productId: string): void {
    const product = this.products.find(
      (product) => product.id === productId
    );
    const dialogRef = this.dialog.open(EditProductComponent, {
      data: product,
      width: '23rem'
    });

    dialogRef.afterClosed().subscribe((result: Product | undefined) => {
      if (result) {
        const index = this.products.findIndex(
          (product) => product.id === result.id
        );
        this.products[index] = result;
        this.dataSource.data = this.products;
        this.snackBar.open('Product updated successfully', 'Close', {
          duration: 3000,
        });
      }
    });
  }

  openCreateProductDialog(): void {
    const dialogRef = this.dialog.open(CreateProductComponent, {
      width: '23rem'
    });

    dialogRef.afterClosed().subscribe((result: Product | undefined) => {
      if (result) {
        this.products.push(result);
        this.dataSource.data = this.products;
        this.snackBar.open('Product created successfully', 'Close', {
          duration: 3000,
        });
      }
    });
  }

  deleteProduct(id: string): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: { message: 'Are you sure you want to delete this product?' },
      width: '23rem'
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.productsService.deleteProduct(id).subscribe({
          next: () => {
            this.getProducts();
            this.snackBar.open('Product deleted successfully', 'Close', {
              duration: 3000,
            });
          },
          error: (err) => {
            console.error(err);
            this.snackBar.open('Failed to delete product', 'Close', {
              duration: 3000,
            });
          },
        });
      }
    });
  }
}
