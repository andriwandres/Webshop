import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentMethodComponent } from './payment-method.component';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [PaymentMethodComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    ReactiveFormsModule
  ],
  exports: [PaymentMethodComponent]
})
export class PaymentMethodModule { }
