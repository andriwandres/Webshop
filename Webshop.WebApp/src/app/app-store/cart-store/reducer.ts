import { Action, createReducer, on } from '@ngrx/store';
import * as cartActions from './actions';
import { cartAdapter, initialState, State } from './state';

const reducer = createReducer(
  initialState,

  // Get Cart
  on(cartActions.getCart, (state) => {
    return {
      ...state,
      isLoading: true,
      error: null,
    };
  }),
  on(cartActions.getCartSuccess, (state, { cartItems }) => {
    return cartAdapter.addAll(cartItems, {
      ...state,
      isLoading: false,
      error: null,
    });
  }),
  on(cartActions.getCartFailure, (state, { error }) => {
    return {
      ...state,
      isLoading: false,
      error
    };
  }),

  // Add Cart Item
  on(cartActions.addCartItem, (state) => {
    return {
      ...state,
      isLoading: true,
      error: null,
    };
  }),
  on(cartActions.addCartItemSuccess, (state, { cartItem }) => {
    return cartAdapter.addOne(cartItem, {
      ...state,
      isLoading: false,
      error: null,
    });
  }),
  on(cartActions.addCartItemFailure, (state, { error }) => {
    return {
      ...state,
      isLoading: false,
      error,
    };
  }),

  // Remove Cart Item
  on(cartActions.removeCartItem, (state) => {
    return {
      ...state,
      isLoading: true,
      error: null,
    };
  }),
  on(cartActions.removeCartItemSuccess, (state, { cartItemId }) => {
    return cartAdapter.removeOne(cartItemId, {
      ...state,
      isLoading: false,
      error: null,
    });
  }),
  on(cartActions.removeCartItemFailure, (state, { error }) => {
    return {
      ...state,
      isLoading: false,
      error,
    };
  })
);

export function cartReducer(state: State | undefined, action: Action): State {
  return reducer(state, action);
}
