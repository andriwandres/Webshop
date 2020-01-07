import { createReducer, on, Action } from '@ngrx/store';
import { initialState, wishlistAdapter, State } from './state';
import * as wishlistActions from './actions';


const reducer = createReducer(
  initialState,

  // Get Wishlist
  on(wishlistActions.getWishlist, (state) => {
    return {
      ...state,
      isLoading: true,
      error: null,
    };
  }),
  on(wishlistActions.getWishlistSuccess, (state, { wishlistItems }) => {
    return wishlistAdapter.addAll(wishlistItems, {
      ...state,
      isLoading: false,
      error: null,
    });
  }),
  on(wishlistActions.getWishlistFailure, (state, { error }) => {
    return {
      ...state,
      isLoading: false,
      error,
    };
  }),

  // Add Wishlist Item
  on(wishlistActions.addWishlistItem, (state) => {
    return {
      ...state,
      isloading: true,
      error: null,
    };
  }),
  on(wishlistActions.addWishlistItemSuccess, (state, { wishlistItem }) => {
    return wishlistAdapter.addOne(wishlistItem, {
      ...state,
      isLoading: false,
      error: null,
    });
  }),
  on(wishlistActions.addWishlistItemFailure, (state, { error }) => {
    return {
      ...state,
      isLoading: false,
      error,
    };
  }),

  // Remove Wishlist Item
  on(wishlistActions.removeWishlistItem, (state) => {
    return {
      ...state,
      isLoading: true,
      error: null,
    };
  }),
  on(wishlistActions.removeWishlistItemSuccess, (state, { wishlistItemId }) => {
    return wishlistAdapter.removeOne(wishlistItemId, {
      ...state,
      isLoading: false,
      error: null,
    });
  }),
  on(wishlistActions.removeWishlistItemFailure, (state, { error }) => {
    return {
      ...state,
      isLoading: false,
      error,
    };
  })
);

export function wishlistReducer(state: State | undefined, action: Action): State {
  return reducer(state, action);
}
