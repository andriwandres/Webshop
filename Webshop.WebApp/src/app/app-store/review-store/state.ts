import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { Review } from 'src/models/reviews/review';

export interface State extends EntityState<Review> {
  isLoading: boolean;
  error: any;
}

export const reviewAdapter = createEntityAdapter<Review>({
  selectId: (review) => review.reviewId,
  sortComparer: (a, b) => a.reviewId - b.reviewId,
});

export const initialState: State = reviewAdapter.getInitialState({
  isLoading: false,
  error: null
});
