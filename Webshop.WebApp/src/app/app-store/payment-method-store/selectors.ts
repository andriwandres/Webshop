
import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as appState from '../state';
import * as paymentMethodState from './state';

export const paymentMethodFeatureKey = 'paymentMethod';
export const selectPaymentMethodFeature = createFeatureSelector<appState.State, paymentMethodState.State>(paymentMethodFeatureKey);

export const selectLoading = createSelector(
  selectPaymentMethodFeature,
  (state) => state.isLoading
);

export const selectError = createSelector(
  selectPaymentMethodFeature,
  (state) => state.error,
);

export const {
  selectAll,
  selectEntities,
  selectIds,
  selectTotal,
} = paymentMethodState.paymentMethodAdapter.getSelectors(selectPaymentMethodFeature);
