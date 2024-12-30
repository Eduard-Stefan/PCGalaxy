import { OrderItem } from './orderItem.model';

export interface Order {
  id: string | undefined;
  userId: string;
  createdAt: string | undefined;
  orderItems: OrderItem[] | undefined;
  deliveryAddress: string;
  coupon: string;
  subtotal: number;
  discount: number;
  deliveryFee: number;
  total: number;
  cardNumber: string | undefined;
  cardExpiryDate: string | undefined;
  cardCvv: string | undefined;
}
