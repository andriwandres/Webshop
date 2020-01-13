import { Update } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';
import { Review } from 'src/models/reviews/review';
import * as reviewActions from './actions';
import { initialState, reviewAdapter, State } from './state';

const reducer = createReducer(
  initialState,

  // Load Reviews
  on(reviewActions.loadReviews, (state) => {
    return {
      ...state,
      isLoading: true,
      error: null,
    };
  }),
  on(reviewActions.loadReviewsSuccess, (state, { reviews }) => {
    return reviewAdapter.addAll(reviews, {
      ...state,
      isLoading: false,
      error: null
    });
  }),
  on(reviewActions.loadReviewsFailure, (state, { error }) => {
    return {
      ...state,
      isLoading: false,
      error,
    };
  }),

  // Create Review
  on(reviewActions.createReview, (state) => {
    return {
      ...state,
      isLoading: true,
      error: null,
    };
  }),
  on(reviewActions.createReviewSuccess, (state, { review }) => {
    return reviewAdapter.addOne(review, {
      ...state,
      isLoading: false,
      error: null,
    });
  }),
  on(reviewActions.createReviewFailure, (state, { error }) => {
    return {
      ...state,
      isLoading: false,
      error,
    };
  }),

  // Edit Review
  on(reviewActions.editReview, (state) => {
    return {
      ...state,
      isLoading: true,
      error: null,
    };
  }),
  on(reviewActions.editReviewSuccess, (state, { review }) => {
    const update: Update<Review> = {
      id: review.reviewId,
      changes: review
    };

    return reviewAdapter.updateOne(update, {
      ...state,
      isLoading: false,
      error: null,
    });
  }),
  on(reviewActions.editReviewFailure, (state, { error }) => {
    return {
      ...state,
      isLoading: false,
      error,
    };
  }),

  // Remove Review
  on(reviewActions.removeReview, (state) => {
    return {
      ...state,
      isLoading: true,
      error: null,
    };
  }),
  on(reviewActions.removeReviewSuccess, (state, { reviewId }) => {
    return reviewAdapter.removeOne(reviewId, {
      ...state,
      isLoading: false,
      error: null,
    });
  }),
  on(reviewActions.removeReviewFailure, (state, { error }) => {
    return {
      ...state,
      isLoading: false,
      error,
    };
  }),
);

export function reviewReducer(state: State | undefined, action: Action): State {
  return reducer(state, action);
}
