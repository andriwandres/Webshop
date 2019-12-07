import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { authFeatureKey } from './selectors';
import { authReducer } from './reducer';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './effects';

@NgModule({
  imports: [
    StoreModule.forFeature(authFeatureKey, authReducer),
    EffectsModule.forFeature([AuthEffects]),
  ],
  providers: [AuthEffects]
})
export class AuthStoreModule { }
