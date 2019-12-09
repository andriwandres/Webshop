import { AuthStoreState } from './auth-store';
import { CartStoreState } from './cart-store';

export interface State {
  auth: AuthStoreState.State;
  cart: CartStoreState.State;
}
