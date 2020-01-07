import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as appState from '../state';
import * as wishlistState from './state';

export const wishlistFeatureKey = 'wishlist';
export const selectWishlistFeature = createFeatureSelector<appState.State, wishlistState.State>(wishlistFeatureKey);

export const selectLoading = createSelector(
  selectWishlistFeature,
  (state) => state.isLoading
);

export const selectError = createSelector(
  selectWishlistFeature,
  (state) => state.error,
);

export const {
  selectAll,
  selectEntities,
  selectIds,
  selectTotal,
} = wishlistState.wishlistAdapter.getSelectors(selectWishlistFeature);
