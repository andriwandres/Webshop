import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { ProductListing } from 'src/models/products/productListing';

export interface State extends EntityState<ProductListing> { }

export const cartAdapter = createEntityAdapter<ProductListing>({
  selectId: (product) => product.productId,
  sortComparer: (a, b) => a.productId - b.productId,
});

export const initialState: State = cartAdapter.getInitialState();
