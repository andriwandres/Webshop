import { createReducer, on, Action } from '@ngrx/store';
import { initialState, paymentMethodAdapter, State } from './state';
import * as paymentMethodActions from './actions';

const reducer = createReducer(
  initialState,

  on(paymentMethodActions.loadPaymentMethods, (state) => {
    return {
      ...state,
      isLoading: true,
      error: null,
    };
  }),
  on(paymentMethodActions.loadPaymentMethodsSuccess, (state, { paymentMethods }) => {
    return paymentMethodAdapter.addAll(paymentMethods, {
      ...state,
      isLoading: false,
      error: null,
    });
  }),
  on(paymentMethodActions.loadPaymentMethodsFailure, (state, { error }) => {
    return {
      ...state,
      isLoading: false,
      error,
    };
  })
);

export function paymentMethodReducer(state: State | undefined, action: Action): State {
  return reducer(state, action);
}
