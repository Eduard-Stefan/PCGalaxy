import { Product } from "./product.model";

export interface CartItem {
  id: string | undefined;
  productId: string;
  product: Product | undefined;
  userId: string;
}
