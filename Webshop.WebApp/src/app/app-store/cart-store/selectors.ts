
import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as appState from '../state';
import * as cartState from './state';

export const cartFeatureKey = 'cart';
export const selectCartFeature = createFeatureSelector<appState.State, cartState.State>(cartFeatureKey);

export const selectLoading = createSelector(
  selectCartFeature,
  (state) => state.isLoading
);

export const selectError = createSelector(
  selectCartFeature,
  (state) => state.error,
);

export const {
  selectAll,
  selectEntities,
  selectIds,
  selectTotal,
} = cartState.cartAdapter.getSelectors(selectCartFeature);
