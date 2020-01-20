import { createSelector } from '@ngrx/store';
import { AuthStoreSelectors } from './auth-store';
import { CartStoreSelectors } from './cart-store';
import { PaymentMethodStoreSelectors } from './payment-method-store';
import { ProductStoreSelectors } from './products-store';
import { ReviewStoreSelectors } from './review-store';
import { WishlistStoreSelectors } from './wishlist-store';

export const selectLoading = createSelector(
  AuthStoreSelectors.selectLoading,
  CartStoreSelectors.selectLoading,
  PaymentMethodStoreSelectors.selectLoading,
  ProductStoreSelectors.selectLoading,
  ReviewStoreSelectors.selectLoading,
  WishlistStoreSelectors.selectLoading,
  (...indicators) => indicators.some(Boolean)
);

export const selectErrors = createSelector(
  AuthStoreSelectors.selectError,
  CartStoreSelectors.selectError,
  PaymentMethodStoreSelectors.selectError,
  ProductStoreSelectors.selectError,
  ReviewStoreSelectors.selectError,
  WishlistStoreSelectors.selectError,
  (...errors) => errors.filter(Boolean),
);
