import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { WishlistEffects } from './effects';
import { wishlistReducer } from './reducer';
import { wishlistFeatureKey } from './selectors';

@NgModule({
  imports: [
    StoreModule.forFeature(wishlistFeatureKey, wishlistReducer),
    EffectsModule.forFeature([WishlistEffects])
  ],
  providers: [WishlistEffects]
})
export class WishlistStoreModule { }
