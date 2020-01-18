import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CheckoutRoutingModule } from './checkout-routing.module';
import { CheckoutComponent } from './checkout.component';
import { CheckoutCartModule } from './checkout-cart/checkout-cart.module';
import { PaymentMethodModule } from './payment-method/payment-method.module';

@NgModule({
  declarations: [CheckoutComponent],
  imports: [
    CommonModule,
    CheckoutRoutingModule,
    CheckoutCartModule,
    PaymentMethodModule,
  ],
  exports: [CheckoutComponent]
})
export class CheckoutModule { }
