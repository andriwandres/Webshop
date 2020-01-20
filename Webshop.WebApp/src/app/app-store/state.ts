
import { AuthStoreState } from './auth-store';
import { CartStoreState } from './cart-store';
import { PaymentMethodStoreState } from './payment-method-store';
import { ProductStoreState } from './products-store';
import { ReviewStoreState } from './review-store';
import { WishlistStoreState } from './wishlist-store';

export interface State {
  auth: AuthStoreState.State;
  cart: CartStoreState.State;
  products: ProductStoreState.State;
  wishlist: WishlistStoreState.State;
  review: ReviewStoreState.State;
  paymentMethod: PaymentMethodStoreState.State;
}
