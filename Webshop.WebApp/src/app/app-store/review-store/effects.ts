import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, map, switchMap } from 'rxjs/operators';
import { ReviewsService } from 'src/app/core/reviews/reviews.service';
import * as reviewActions from './actions';

@Injectable()
export class ReviewEffects {
  readonly loadReviewsEffect$ = createEffect(() => this.actions$.pipe(
    ofType(reviewActions.loadReviews),
    switchMap(action => this.reviewService.getReviews(action.productId).pipe(
      map(reviews => reviewActions.loadReviewsSuccess({ reviews })),
      catchError(error => of(reviewActions.loadReviewsFailure({ error })))
    )),
  ));

  readonly createReviewEffect$ = createEffect(() => this.actions$.pipe(
    ofType(reviewActions.createReview),
    exhaustMap(action => this.reviewService.createReview(action.productId, action.review).pipe(
      map(review => reviewActions.createReviewSuccess({ review })),
      catchError(error => of(reviewActions.createReviewFailure({ error })))
    )),
  ));

  readonly editReviewEffect$ = createEffect(() => this.actions$.pipe(
    ofType(reviewActions.editReview),
    exhaustMap(action => this.reviewService.createReview(action.reviewId, action.review).pipe(
      map(review => reviewActions.editReviewSuccess({ review })),
      catchError(error => of(reviewActions.editReviewFailure({ error })))
    )),
  ));

  readonly removeReviewEffect$ = createEffect(() => this.actions$.pipe(
    ofType(reviewActions.removeReview),
    exhaustMap(action => this.reviewService.deleteReview(action.reviewId).pipe(
      map(reviewId => reviewActions.removeReviewSuccess({ reviewId })),
      catchError(error => of(reviewActions.removeReviewFailure({ error })))
    )),
  ));

  constructor(
    private readonly reviewService: ReviewsService,
    private readonly actions$: Actions<reviewActions.ReviewActionsUnion>,
  ) {}
}
