import { ProductImage } from './productImage';

export interface ProductDetails {
  productId: number;
  title: string;
  description: string;
  quantity: number;
  price: number;
  averageStars: number;

  images: ProductImage[];
}
