import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { ReviewEffects } from './effects';
import { reviewReducer } from './reducer';
import { reviewFeatureKey } from './selectors';

@NgModule({
  imports: [
    StoreModule.forFeature(reviewFeatureKey, reviewReducer),
    EffectsModule.forFeature([ReviewEffects]),
  ],
  providers: [ReviewEffects]
})
export class ReviewStoreModule { }
