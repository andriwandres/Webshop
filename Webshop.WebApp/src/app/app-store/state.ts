
import { AuthStoreState } from './auth-store';
import { CartStoreState } from './cart-store';
import { ProductStoreState } from './products-store';

export interface State {
  auth: AuthStoreState.State;
  cart: CartStoreState.State;
  products: ProductStoreState.State;
}
