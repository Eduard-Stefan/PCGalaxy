import { Component, OnInit } from '@angular/core';
import { AccountService } from './services/account.service';
import { User } from './models/user.model';
import { Router } from '@angular/router';
import { ProductsService } from './services/products.service';
import { Product } from './models/product.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  static currentUser: User | undefined;
  static signedIn: boolean = false;
  static isAdmin: boolean = false;

  searchTerm: string = '';
  searchResults: Product[] = [];

  constructor(public accountService: AccountService, private router: Router, private productsService: ProductsService) {
    this.isSignedIn();
    this.getCurrentUser();
  }

  ngOnInit() {
    this.checkAdminRole();
  }

  get currentUser() {
    return AppComponent.currentUser;
  }

  set currentUser(value: User | undefined) {
    AppComponent.currentUser = value;
  }

  get signedIn() {
    return AppComponent.signedIn;
  }

  set signedIn(value: boolean) {
    AppComponent.signedIn = value;
  }

  get isAdmin() {
    return AppComponent.isAdmin;
  }

  set isAdmin(value: boolean) {
    AppComponent.isAdmin = value;
  }

  logout() {
    this.accountService.logout().subscribe({
      next: () => {
        this.currentUser = undefined;
        this.signedIn = false;
        this.isAdmin = false;
        this.router.navigate(['/'], {
          queryParams: { message: 'Logout successful' },
        });
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  isSignedIn() {
    this.accountService.isSignedIn().subscribe({
      next: (response: boolean) => {
        this.signedIn = response;
      },
      error: () => {
        this.signedIn = false;
      },
    });
  }

  getCurrentUser() {
    this.accountService.getCurrentUser().subscribe({
      next: (response) => {
        this.currentUser = response;
      },
      error: (err) => {
        this.currentUser = undefined;
        console.error(err);
      },
    });
  }

  checkAdminRole() {
    this.accountService.getCurrentUserRole().subscribe({
      next: (role: string) => {
        this.isAdmin = role === 'admin';
      },
      error: () => {
        this.isAdmin = false;
      },
    });
  }

  onSearch() {
    if (this.searchTerm.trim()) {
      this.router.navigate(['/search'], { queryParams: { term: this.searchTerm } });
    }
  }
}
