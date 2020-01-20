import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { PaymentMethodEffects } from './effects';
import { paymentMethodReducer } from './reducer';
import { paymentMethodFeatureKey } from './selectors';

@NgModule({
  imports: [
    StoreModule.forFeature(paymentMethodFeatureKey, paymentMethodReducer),
    EffectsModule.forFeature([PaymentMethodEffects]),
  ],
  providers: [PaymentMethodEffects]
})
export class PaymentMethodStoreModule { }
