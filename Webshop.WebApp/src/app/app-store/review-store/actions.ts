import { createAction, props, union } from '@ngrx/store';
import { Review } from 'src/models/reviews/review';
import { ReviewDto } from 'src/models/reviews/review-dto';

export enum ActionTypes {
  LOAD_REVIEWS = '[Reviews] Load Reviews',
  LOAD_REVIEWS_SUCCESS = '[Reviews] Load Reviews Success',
  LOAD_REVIEWS_FAILURE = '[Reviews] Load Reviews Failure',

  CREATE_REVIEW = '[Review] Create Review',
  CREATE_REVIEW_SUCCESS = '[Review] Create Review Success',
  CREATE_REVIEW_FAILURE = '[Review] Create Review Failure',

  EDIT_REVIEW = '[Review] Edit Review',
  EDIT_REVIEW_SUCCESS = '[Review] Edit Review Success',
  EDIT_REVIEW_FAILURE = '[Review] Edit Review Failure',

  REMOVE_REVIEW = '[Review] Remove Review',
  REMOVE_REVIEW_SUCCESS = '[Review] Remove Review Success',
  REMOVE_REVIEW_FAILURE = '[Review] Remove Review Failure',
}

export const loadReviews = createAction(ActionTypes.LOAD_REVIEWS, props<{ productId: number }>());
export const loadReviewsSuccess = createAction(ActionTypes.LOAD_REVIEWS_SUCCESS, props<{ reviews: Review[] }>());
export const loadReviewsFailure = createAction(ActionTypes.LOAD_REVIEWS_FAILURE, props<{ error: any }>());

export const createReview = createAction(ActionTypes.CREATE_REVIEW, props<{ productId: number, review: ReviewDto }>());
export const createReviewSuccess = createAction(ActionTypes.CREATE_REVIEW_SUCCESS, props<{ review: Review }>());
export const createReviewFailure = createAction(ActionTypes.CREATE_REVIEW_FAILURE, props<{ error: any }>());

export const editReview = createAction(ActionTypes.EDIT_REVIEW, props<{ reviewId: number, review: ReviewDto }>());
export const editReviewSuccess = createAction(ActionTypes.EDIT_REVIEW_SUCCESS, props<{ review: Review }>());
export const editReviewFailure = createAction(ActionTypes.EDIT_REVIEW_FAILURE, props<{ error: any }>());

export const removeReview = createAction(ActionTypes.REMOVE_REVIEW, props<{ reviewId: number }>());
export const removeReviewSuccess = createAction(ActionTypes.REMOVE_REVIEW_SUCCESS, props<{ reviewId: number }>());
export const removeReviewFailure = createAction(ActionTypes.REMOVE_REVIEW_FAILURE, props<{ error: any }>());

const allActions = union({
  loadReviews,
  loadReviewsSuccess,
  loadReviewsFailure,
  createReview,
  createReviewSuccess,
  createReviewFailure,
  editReview,
  editReviewSuccess,
  editReviewFailure,
  removeReview,
  removeReviewSuccess,
  removeReviewFailure,
});

export type ReviewActionsUnion = typeof allActions;
