import { createAction, props, union } from '@ngrx/store';
import { PaymentMethod } from 'src/models/payment-methods/payment-method';

export enum ActionTypes {
  LOAD_PAYMENT_METHODS = '[Payment Method] Load Payment Methods',
  LOAD_PAYMENT_METHODS_SUCCESS = '[Payment Method] Load Payment Methods Success',
  LOAD_PAYMENT_METHODS_FAILURE = '[Payment Method] Load Payment Methods Failure',
}

export const loadPaymentMethods = createAction(ActionTypes.LOAD_PAYMENT_METHODS);
export const loadPaymentMethodsSuccess = createAction(ActionTypes.LOAD_PAYMENT_METHODS_SUCCESS, props<{ paymentMethods: PaymentMethod[] }>());
export const loadPaymentMethodsFailure = createAction(ActionTypes.LOAD_PAYMENT_METHODS_FAILURE, props<{ error: any }>());

const allActions = union({
  loadPaymentMethods,
  loadPaymentMethodsSuccess,
  loadPaymentMethodsFailure,
});

export type PaymentMethodActionUnion = typeof allActions;
