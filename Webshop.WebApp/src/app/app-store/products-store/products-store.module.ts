
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { ProductEffects } from './effects';
import { productReducer } from './reducer';
import { productFeatureKey } from './selectors';

@NgModule({
  imports: [
    StoreModule.forFeature(productFeatureKey, productReducer),
    EffectsModule.forFeature([ProductEffects]),
  ],
  providers: [ProductEffects]
})
export class ProductsStoreModule { }
