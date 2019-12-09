import { ProductImage } from './productImage';
import { Review } from '../reviews/review';

export interface ProductDetails {
  productId: number;
  title: string;
  description: string;
  quantity: number;
  price: number;
  averageStars: number;

  images: ProductImage[];
  reviews: Review[];
}
