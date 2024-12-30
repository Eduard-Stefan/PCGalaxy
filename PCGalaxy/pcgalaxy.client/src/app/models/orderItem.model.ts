import { Product } from "./product.model";

export interface OrderItem {
  id: string | undefined;
  productId: string;
  product: Product | undefined;
  orderId: string;
}
