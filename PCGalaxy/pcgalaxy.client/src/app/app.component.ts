import { Component, OnInit } from '@angular/core';
import { AccountService } from './services/account.service';
import { User } from './models/user.model';
import { Router } from '@angular/router';
import { ProductsService } from './services/products.service';
import { Product } from './models/product.model';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Subject, of } from 'rxjs';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

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
  searchSuggestions: string[] = [];
  private searchTerms = new Subject<string>();
  showSuggestions: boolean = false;
  searchSpec: string = '';

  constructor(
    public accountService: AccountService,
    private router: Router,
    private productsService: ProductsService,
    private sanitizer: DomSanitizer
  ) {
    this.isSignedIn();
    this.getCurrentUser();
  }

  ngOnInit() {
    this.checkAdminRole();

    this.searchTerms
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((term: string) => {
          return term.length > 0
            ? this.productsService.getSearchSuggestions(term)
            : of([]);
        })
      )
      .subscribe((suggestions) => {
        this.searchSuggestions = suggestions;
        this.showSuggestions =
          suggestions.length > 0 || this.searchTerm.trim().length > 0;
      });
  }

  highlightMatch(text: string): SafeHtml {
    if (!this.searchTerm.trim()) {
      return text;
    }

    const regex = new RegExp(
      `(${this.escapeRegExp(this.searchTerm.trim())})`,
      'gi'
    );
    const highlighted = text.replace(
      regex,
      '<strong style="color: #3f51b5;">$1</strong>'
    );

    return this.sanitizer.bypassSecurityTrustHtml(highlighted);
  }

  private escapeRegExp(str: string): string {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  search(term: string): void {
    this.searchTerm = term;
    this.searchTerms.next(term);
  }

  selectSuggestion(suggestion: string): void {
    this.searchTerm = suggestion;
    this.searchSuggestions = [];
    this.showSuggestions = false;
    this.onSearch();
  }

  onBlur(): void {
    setTimeout(() => {
      this.showSuggestions = false;
    }, 200);
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
      this.searchSuggestions = [];
      this.showSuggestions = false;
      this.router.navigate(['/search'], {
        queryParams: { term: this.searchTerm },
      });
    }
  }

  onSearchSpec() {
    if (this.searchSpec.trim()) {
      this.router.navigate(['/search-in-specs'], {
        queryParams: { term: this.searchSpec },
      });
    }
  }
}
