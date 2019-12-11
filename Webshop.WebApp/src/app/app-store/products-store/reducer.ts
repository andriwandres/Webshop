import { Action, createReducer, on } from '@ngrx/store';
import * as productActions from './actions';
import { initialState, productAdapter, State } from './state';

const reducer = createReducer(
  initialState,

  // Get products
  on(productActions.getProducts, (state) => {
    return {
      ...state,
      isLoading: true,
      error: null,
    };
  }),
  on(productActions.getProductsSuccess, (state, { products }) => {
    return productAdapter.addAll(products, {
      ...state,
      isLoading: false,
      error: null,
    });
  }),
  on(productActions.getProductsFailure, (state, { error }) => {
    return {
      ...state,
      isLoading: false,
      error,
    };
  }),

  // Get product details
  on(productActions.getProductDetails, (state) => {
    return {
      ...state,
      isLoading: true,
      error: null,
    };
  }),
  on(productActions.getProductDetailsSuccess, (state, { product }) => {
    return {
      ...state,
      selectedProduct: product,
      isLoading: false,
      error: null,
    };
  }),
  on(productActions.getProductDetailsFailure, (state, { error }) => {
    return {
      ...state,
      selectedProduct: null,
      isLoading: false,
      error,
    };
  })
);

export function productReducer(state: State | undefined, action: Action): State {
  return reducer(state, action);
}
