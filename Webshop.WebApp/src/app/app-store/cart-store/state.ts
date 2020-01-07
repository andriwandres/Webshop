import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { CartItem } from 'src/models/cart/cart-item';

export interface State extends EntityState<CartItem> {
  isLoading: boolean;
  error: any;
}

export const cartAdapter = createEntityAdapter<CartItem>({
  selectId: (product) => product.cartItemId,
  sortComparer: (a, b) => a.cartItemId - b.cartItemId,
});

export const initialState: State = cartAdapter.getInitialState({
  isLoading: false,
  error: null
});
