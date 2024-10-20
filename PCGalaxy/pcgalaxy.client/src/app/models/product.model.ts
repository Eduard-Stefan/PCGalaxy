import { Category } from "./category.model";

export interface Product {
  id: string;
  name: string;
  description: string;
  specifications: string;
  price: number;
  stock: number;
  supplier: string;
  deliveryMethod: string;
  category: Category;
}
