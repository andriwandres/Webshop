import { createAction, props, union } from '@ngrx/store';
import { ProductListing } from 'src/models/products/productListing';
import { ProductDetails } from 'src/models/products/productDetails';
import { ProductQuery } from 'src/models/products/productQuery';

export enum ActionTypes {
  GET_PRODUCTS = '[Product] Get Products',
  GET_PRODUCTS_SUCCESS = '[Product] Get Products Success',
  GET_PRODUCTS_FAILURE = '[Product] Get Products Failure',

  GET_PRODUCT_DETAILS = '[Product] Get Product Details',
  GET_PRODUCT_DETAILS_SUCCESS = '[Product] Get Product Details Success',
  GET_PRODUCT_DETAILS_FAILURE = '[Product] Get Product Details Failure',
}

// Get products
export const getProducts = createAction(ActionTypes.GET_PRODUCTS, props<{ query: ProductQuery }>());
export const getProductsSuccess = createAction(ActionTypes.GET_PRODUCTS_SUCCESS, props<{ products: ProductListing[] }>());
export const getProductsFailure = createAction(ActionTypes.GET_PRODUCTS_FAILURE, props<{ error: any }>());

// Get product details
export const getProductDetails = createAction(ActionTypes.GET_PRODUCT_DETAILS, props<{ productId: number }>());
export const getProductDetailsSuccess = createAction(ActionTypes.GET_PRODUCT_DETAILS_SUCCESS, props<{ product: ProductDetails }>());
export const getProductDetailsFailure = createAction(ActionTypes.GET_PRODUCT_DETAILS_FAILURE, props<{ error: any }>());

const allActions = union({
  getProducts,
  getProductsSuccess,
  getProductsFailure,
  getProductDetails,
  getProductDetailsSuccess,
  getProductDetailsFailure,
});

export type ProductActionUnion = typeof allActions;
