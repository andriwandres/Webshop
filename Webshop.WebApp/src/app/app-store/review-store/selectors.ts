import { createFeatureSelector, createSelector, props } from '@ngrx/store';
import * as appState from '../state';
import * as reviewState from './state';
import { selectAuthFeature } from '../auth-store/selectors';

export const reviewFeatureKey = 'review';
export const selectReviewFeature = createFeatureSelector<appState.State, reviewState.State>(reviewFeatureKey);

export const selectLoading = createSelector(
  selectReviewFeature,
  (state) => state.isLoading
);

export const selectError = createSelector(
  selectReviewFeature,
  (state) => state.error,
);

export const {
  selectAll,
  selectEntities,
  selectIds,
  selectTotal,
} = reviewState.reviewAdapter.getSelectors(selectReviewFeature);

export const selectHasAlreadyReviewed = createSelector(
  selectAll,
  selectAuthFeature,
  (all, authState) => all.some(r => r.userId === authState.user.userId),
);
