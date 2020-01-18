import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { PaymentMethod } from 'src/models/payment-methods/payment-method';

export interface State extends EntityState<PaymentMethod> {
  isLoading: boolean;
  error: any;
}

export const paymentMethodAdapter = createEntityAdapter<PaymentMethod>({
  selectId: paymentMethod => paymentMethod.paymentMethodId
});

export const initialState: State = paymentMethodAdapter.getInitialState({
  isLoading: false,
  error: null,
});
