import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { CartEffects } from './effects';
import { cartReducer } from './reducer';
import { cartFeatureKey } from './selectors';

@NgModule({
  imports: [
    StoreModule.forFeature(cartFeatureKey, cartReducer),
    EffectsModule.forFeature([CartEffects]),
  ],
  providers: [CartEffects]
})
export class CartStoreModule { }
