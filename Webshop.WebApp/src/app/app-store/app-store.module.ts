import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';
import { AuthStoreModule } from './auth-store';
import { CartStoreModule } from './cart-store';
import { ProductsStoreModule } from './products-store';
import { ReviewStoreModule } from './review-store';
import { WishlistStoreModule } from './wishlist-store';
import { PaymentMethodStoreModule } from './payment-method-store';

@NgModule({
  imports: [
    AuthStoreModule,
    CartStoreModule,
    ProductsStoreModule,
    WishlistStoreModule,
    ReviewStoreModule,
    PaymentMethodStoreModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
  ]
})
export class AppStoreModule { }
