import { Product } from "./product.model";

export interface ProductSearchResult {
    product: Product;
    score: number;
}