import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatMenu } from '@angular/material/menu';
import { select, Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { AppStoreState } from 'src/app/app-store';
import { CartStoreActions, CartStoreSelectors } from 'src/app/app-store/cart-store';
import { CartItem } from 'src/models/cart/cart-item';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit, OnDestroy {
  @ViewChild(MatMenu, { static: true }) menu: MatMenu;

  private readonly destroy$ = new Subject<void>();

  readonly itemsCount$ = this.store$.pipe(
    select(CartStoreSelectors.selectTotal),
    takeUntil(this.destroy$),
  );

  readonly cartItems$ = this.store$.pipe(
    select(CartStoreSelectors.selectAll),
    takeUntil(this.destroy$),
  );

  readonly totalPrice$ = this.cartItems$.pipe(
    map(item => item.reduce((previous, current) => previous + current.price, 0)),
    takeUntil(this.destroy$),
  );

  constructor(private readonly store$: Store<AppStoreState.State>) { }

  ngOnInit(): void {
    this.store$.dispatch(CartStoreActions.getCart());
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  trackById(product: CartItem): number {
    return product.cartItemId;
  }

  onRemoveItem(cartItemId: number): void {
    this.store$.dispatch(CartStoreActions.removeCartItem({ cartItemId }));
  }
}
