import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Order } from 'src/models/order/order';
import { PaymentMethod } from 'src/models/payment-methods/payment-method';

@Component({
  selector: 'app-payment-method',
  templateUrl: './payment-method.component.html',
  styleUrls: ['./payment-method.component.scss']
})
export class PaymentMethodComponent {
  @Input() paymentMethods: PaymentMethod[];
  @Output() checkout = new EventEmitter<Order>();

  readonly paymentMethodId = new FormControl(null, [Validators.required]);

  selectMethod(paymentMethodId: number): void {
    this.paymentMethodId.setValue(paymentMethodId);
  }

  submit(): void {
    if (this.paymentMethodId.valid) {
      const order: Order = {
        paymentMethodId: this.paymentMethodId.value
      };

      this.checkout.emit(order);
    }
  }
}
