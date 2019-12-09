import { createAction, props, union } from '@ngrx/store';
import { ProductListing } from 'src/models/products/productListing';

export enum ActionTypes {
  ADD_CART_ITEM = '[Cart] Add Cart Item',
  REMOVE_CART_ITEM = '[Cart] Remove Cart Item',
  CLEAR_CART = '[Cart] Clear Cart',
}

export const addCartItem = createAction(ActionTypes.ADD_CART_ITEM, props<{ product: ProductListing }>());
export const removeCartItem = createAction(ActionTypes.REMOVE_CART_ITEM, props<{ productId: number }>());
export const clearCart = createAction(ActionTypes.CLEAR_CART);

const allActions = union({
  addCartItem,
  removeCartItem,
  clearCart,
});

export type CartActionUnion = typeof allActions;
