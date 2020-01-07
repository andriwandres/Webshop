import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { WishlistItem } from 'src/models/wishlist/wishlist-item';

export interface State extends EntityState<WishlistItem> {
  isLoading: boolean;
  error: any;
}

export const wishlistAdapter = createEntityAdapter<WishlistItem>({
  selectId: item => item.wishlistItemId,
  sortComparer: (a, b) => a.wishlistItemId - b.wishlistItemId
});

export const initialState: State = wishlistAdapter.getInitialState({
  isLoading: false,
  error: null
});

