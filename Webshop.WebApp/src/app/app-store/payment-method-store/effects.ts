import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { PaymentMethodService } from 'src/app/core/payment-method/payment-method.service';
import * as paymentMethodActions from './actions';
import { PaymentMethodActionUnion } from './actions';

@Injectable()
export class PaymentMethodEffects {
  readonly loadPaymentMethodsEffect$ = createEffect(() => this.actions$.pipe(
    ofType(paymentMethodActions.loadPaymentMethods),
    switchMap(() => this.paymentMethodService.getPaymentMethods().pipe(
      map(paymentMethods => paymentMethodActions.loadPaymentMethodsSuccess({ paymentMethods })),
      catchError(error => of(paymentMethodActions.loadPaymentMethodsFailure({ error })))
    ))
  ));

  constructor(
    private readonly paymentMethodService: PaymentMethodService,
    private readonly actions$: Actions<PaymentMethodActionUnion>,
  ) {}
}
