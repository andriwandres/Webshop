import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as appState from '../state';
import * as authState from './state';

export const productFeatureKey = 'products';
export const selectAuthFeature = createFeatureSelector<appState.State, authState.State>(productFeatureKey);

export const selectLoading = createSelector(
  selectAuthFeature,
  (state) => state.isLoading
);

export const selectError = createSelector(
  selectAuthFeature,
  (state) => state.error,
);

export const selectSelectedProduct = createSelector(
  selectAuthFeature,
  (state) => state.selectedProduct,
);
