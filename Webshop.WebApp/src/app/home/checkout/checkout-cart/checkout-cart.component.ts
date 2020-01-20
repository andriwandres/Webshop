import { Component, OnDestroy } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { takeUntil, map } from 'rxjs/operators';
import { AppStoreState } from 'src/app/app-store';
import { CartStoreActions, CartStoreSelectors } from 'src/app/app-store/cart-store';

@Component({
  selector: 'app-checkout-cart',
  templateUrl: './checkout-cart.component.html',
  styleUrls: ['./checkout-cart.component.scss']
})
export class CheckoutCartComponent implements OnDestroy {
  private readonly destroy$ = new Subject<void>();

  readonly cartItems$ = this.store$.pipe(
    select(CartStoreSelectors.selectAll),
    takeUntil(this.destroy$),
  );

  readonly totalPrice$ = this.cartItems$.pipe(
    map(items => items.reduce((acc, curr) => acc + curr.price, 0)),
  );

  constructor(private readonly store$: Store<AppStoreState.State>) {}

  onRemove(cartItemId: number): void {
    this.store$.dispatch(CartStoreActions.removeCartItem({ cartItemId }));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
