import { Action, createReducer, on } from '@ngrx/store';
import * as cartActions from './actions';
import { cartAdapter, initialState, State } from './state';

const reducer = createReducer(
  initialState,

  on(cartActions.addCartItem, (state, { product }) => {
    return cartAdapter.addOne(product, {
      ...state
    });
  }),

  on(cartActions.removeCartItem, (state, { productId }) => {
    return cartAdapter.removeOne(productId, {
      ...state
    });
  }),

  on(cartActions.clearCart, (state) => {
    return cartAdapter.removeAll({
      ...state
    });
  })
);

export function cartReducer(state: State | undefined, action: Action): State {
  return reducer(state, action);
}
