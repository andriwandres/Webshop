import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { ProductDetails } from 'src/models/products/productDetails';
import { ProductListing } from 'src/models/products/productListing';

export interface State extends EntityState<ProductListing> {
  selectedProduct: ProductDetails;
  isLoading: boolean;
  error: any;
}

export const productAdapter = createEntityAdapter<ProductListing>({
  selectId: product => product.productId,
  sortComparer: (a, b) => a.productId - b.productId,
});

export const initialState: State = productAdapter.getInitialState({
  selectedProduct: null,
  isLoading: false,
  error: null,
});
