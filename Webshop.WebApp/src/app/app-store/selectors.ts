import { createSelector } from '@ngrx/store';
import { AuthStoreSelectors } from './auth-store';

export const selectLoading = createSelector(
  AuthStoreSelectors.selectLoading,
  (...indicators) => indicators.some(indicator => indicator)
);
