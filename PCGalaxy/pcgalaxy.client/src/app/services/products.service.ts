import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";
import { Product } from "../models/product.model";
import { ProductSearchResult } from "../models/productSearchResult.model";

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/products`);
  }

  getProductsByCategory(categoryId: number): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/products/category/${categoryId}`);
  }

  getProductById(id: string): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/products/${id}`);
  }

  getSearchSuggestions(term: string): Observable<string[]> {
    if (!term.trim()) {
      return new Observable<string[]>((observer) => observer.next([]));
    }
    return this.http.get<string[]>(`${this.apiUrl}/products/suggestions?term=${term}`);
  }

  searchInSpecs(query: string, categoryId?: number, ascending: boolean = false): Observable<ProductSearchResult[]> {
    const params: any = { query, ascending };
    if (categoryId !== undefined) {
      params.categoryId = categoryId;
    }
    return this.http.get<ProductSearchResult[]>(`${this.apiUrl}/products/search-in-specs`, { params });
  }

  searchProducts(term: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/products/search`, { params: { term } });
  }

  updateProduct(id: string, product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.apiUrl}/products/${id}`, product, { withCredentials: true });
  }

  createProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(`${this.apiUrl}/products`, product, { withCredentials: true });
  }

  deleteProduct(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/products/${id}`, { withCredentials: true });
  }
}
