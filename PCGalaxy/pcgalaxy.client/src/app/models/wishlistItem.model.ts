import { Product } from "./product.model";

export interface WishlistItem {
  id: string | undefined;
  productId: string;
  product: Product | undefined;
  userId: string;
}
