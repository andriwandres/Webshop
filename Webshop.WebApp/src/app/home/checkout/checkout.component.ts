import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppStoreState } from 'src/app/app-store';
import { OrderService } from 'src/app/core/order/order.service';
import { Subject } from 'rxjs';
import { PaymentMethodStoreActions, PaymentMethodStoreSelectors } from 'src/app/app-store/payment-method-store';
import { Order } from 'src/models/order/order';
import { takeUntil } from 'rxjs/operators';
import { CartStoreSelectors, CartStoreActions } from 'src/app/app-store/cart-store';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit, OnDestroy {
  private readonly destroy$ = new Subject<void>();

  readonly paymentMethods$ = this.store$.pipe(
    select(PaymentMethodStoreSelectors.selectAll),
    takeUntil(this.destroy$),
  );

  constructor(
    private readonly router: Router,
    private readonly snackbar: MatSnackBar,
    private readonly orderService: OrderService,
    private readonly store$: Store<AppStoreState.State>,
  ) { }

  ngOnInit(): void {
    this.store$.dispatch(PaymentMethodStoreActions.loadPaymentMethods());
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onCheckout(order: Order): void {
    this.orderService.checkout(order).subscribe(() => {
      this.store$.dispatch(CartStoreActions.clearCart());
      this.router.navigate(['/products']);
      this.snackbar.open('Order has been placed', '', {
        duration: 3000,
        verticalPosition: 'bottom',
        horizontalPosition: 'right',
      });
    });
  }
}
