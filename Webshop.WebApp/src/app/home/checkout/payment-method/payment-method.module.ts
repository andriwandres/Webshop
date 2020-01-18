import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentMethodComponent } from './payment-method.component';



@NgModule({
  declarations: [PaymentMethodComponent],
  imports: [
    CommonModule
  ],
  exports: [PaymentMethodComponent]
})
export class PaymentMethodModule { }
