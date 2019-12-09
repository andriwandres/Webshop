import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { cartReducer } from './reducer';
import { cartFeatureKey } from './selectors';

@NgModule({
  imports: [
    StoreModule.forFeature(cartFeatureKey, cartReducer),
  ]
})
export class CartStoreModule { }
