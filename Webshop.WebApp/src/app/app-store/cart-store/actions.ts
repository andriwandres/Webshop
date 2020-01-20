import { createAction, props, union } from '@ngrx/store';
import { CartItem } from 'src/models/cart/cart-item';

export enum ActionTypes {
  GET_CART = '[Cart] Get Cart',
  GET_CART_SUCCESS = '[Cart] Get Cart Success',
  GET_CART_FAILURE = '[Cart] Get Cart Failure',

  ADD_CART_ITEM = '[Cart] Add Cart Item',
  ADD_CART_ITEM_SUCCESS = '[Cart] Add Cart Item Success',
  ADD_CART_ITEM_FAILURE = '[Cart] Add Cart Item Failure',

  REMOVE_CART_ITEM = '[Cart] Remove Cart Item',
  REMOVE_CART_ITEM_SUCCESS = '[Cart] Remove Cart Item Success',
  REMOVE_CART_ITEM_FAILURE = '[Cart] Remove Cart Item Failure',

  CLEAR_CART = '[Cart] Clear Cart'
}

export const getCart = createAction(ActionTypes.GET_CART);
export const getCartSuccess = createAction(ActionTypes.GET_CART_SUCCESS, props<{ cartItems: CartItem[] }>());
export const getCartFailure = createAction(ActionTypes.GET_CART_FAILURE, props<{ error: any }>());

export const addCartItem = createAction(ActionTypes.ADD_CART_ITEM, props<{ productId: number }>());
export const addCartItemSuccess = createAction(ActionTypes.ADD_CART_ITEM_SUCCESS, props<{ cartItem: CartItem }>());
export const addCartItemFailure = createAction(ActionTypes.ADD_CART_ITEM_FAILURE, props<{ error: any }>());

export const removeCartItem = createAction(ActionTypes.REMOVE_CART_ITEM, props<{ cartItemId: number }>());
export const removeCartItemSuccess = createAction(ActionTypes.REMOVE_CART_ITEM_SUCCESS, props<{ cartItemId: number }>());
export const removeCartItemFailure = createAction(ActionTypes.REMOVE_CART_ITEM_FAILURE, props<{ error: any }>());

export const clearCart = createAction(ActionTypes.CLEAR_CART);

const allActions = union({
  getCart,
  getCartSuccess,
  getCartFailure,
  addCartItem,
  addCartItemSuccess,
  addCartItemFailure,
  removeCartItem,
  removeCartItemSuccess,
  removeCartItemFailure,
  clearCart,
});

export type CartActionUnion = typeof allActions;
