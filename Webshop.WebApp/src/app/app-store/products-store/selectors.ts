import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as appState from '../state';
import * as productState from './state';

export const productFeatureKey = 'products';
export const selectProductsFeature = createFeatureSelector<appState.State, productState.State>(productFeatureKey);

export const selectLoading = createSelector(
  selectProductsFeature,
  (state) => state.isLoading
);

export const selectError = createSelector(
  selectProductsFeature,
  (state) => state.error,
);

export const selectSelectedProduct = createSelector(
  selectProductsFeature,
  (state) => state.selectedProduct,
);

export const {
  selectAll,
  selectEntities,
  selectIds,
  selectTotal,
} = productState.productAdapter.getSelectors(selectProductsFeature);
