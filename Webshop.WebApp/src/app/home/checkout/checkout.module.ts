import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CheckoutRoutingModule } from './checkout-routing.module';
import { CheckoutComponent } from './checkout.component';
import { CheckoutCartModule } from './checkout-cart/checkout-cart.module';
import { PaymentMethodModule } from './payment-method/payment-method.module';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [CheckoutComponent],
  imports: [
    CommonModule,
    CheckoutRoutingModule,
    CheckoutCartModule,
    PaymentMethodModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
  ],
  exports: [CheckoutComponent]
})
export class CheckoutModule { }
