import { createAction, props, union } from '@ngrx/store';
import { WishlistItem } from 'src/models/wishlist/wishlist-item';

export enum ActionTypes {
  GET_WISHLIST = '[Wishlist] Get Wishlist',
  GET_WISHLIST_SUCCESS = '[Wishlist] Get Wishlist Success',
  GET_WISHLIST_FAILURE = '[Wishlist] Get Wishlist Failure',

  ADD_WISHLIST_ITEM = '[Wishlist] Add Wishlist Item',
  ADD_WISHLIST_ITEM_SUCCESS = '[Wishlist] Add Wishlist Item Success',
  ADD_WISHLIST_ITEM_FAILURE = '[Wishlist] Add Wishlist Item Failure',

  REMOVE_WISHLIST_ITEM = '[Wishlist] Remove Wishlist Item',
  REMOVE_WISHLIST_ITEM_SUCCESS = '[Wishlist] Remove Wishlist Item Success',
  REMOVE_WISHLIST_ITEM_FAILURE = '[Wishlist] Remove Wishlist Item Failure',
}

// Get Wishlist
export const getWishlist = createAction(ActionTypes.GET_WISHLIST);
export const getWishlistSuccess = createAction(ActionTypes.GET_WISHLIST_SUCCESS, props<{ wishlistItems: WishlistItem[] }>());
export const getWishlistFailure = createAction(ActionTypes.GET_WISHLIST_FAILURE, props<{ error: any }>());

// Add Wishlist Item
export const addWishlistItem = createAction(ActionTypes.ADD_WISHLIST_ITEM, props<{ productId: number }>());
export const addWishlistItemSuccess = createAction(ActionTypes.ADD_WISHLIST_ITEM_SUCCESS, props<{ wishlistItem: WishlistItem }>());
export const addWishlistItemFailure = createAction(ActionTypes.ADD_WISHLIST_ITEM_FAILURE, props<{ error: any }>());

// Remove Wishlist Item
export const removeWishlistItem = createAction(ActionTypes.REMOVE_WISHLIST_ITEM, props<{ wishlistItemId: number }>());
export const removeWishlistItemSuccess = createAction(ActionTypes.REMOVE_WISHLIST_ITEM_SUCCESS, props<{ wishlistItemId: number }>());
export const removeWishlistItemFailure = createAction(ActionTypes.REMOVE_WISHLIST_ITEM_FAILURE, props<{ error: any }>());

// Union Type for all actions
const allActions = union({
  getWishlist,
  getWishlistSuccess,
  getWishlistFailure,
  addWishlistItem,
  addWishlistItemSuccess,
  addWishlistItemFailure,
  removeWishlistItem,
  removeWishlistItemSuccess,
  removeWishlistItemFailure,
});

export type WishlistActionUnion = typeof allActions;
