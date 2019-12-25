import { Component, OnDestroy, ViewChild } from '@angular/core';
import { MatMenu } from '@angular/material/menu';
import { select, Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { AppStoreState } from 'src/app/app-store';
import { CartStoreSelectors } from 'src/app/app-store/cart-store';
import { ProductListing } from 'src/models/products/productListing';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent implements OnDestroy {
  @ViewChild(MatMenu, { static: true }) menu: MatMenu;

  private readonly destroy$ = new Subject<void>();

  readonly itemsCount$ = this.store$.pipe(
    select(CartStoreSelectors.selectTotal),
    takeUntil(this.destroy$),
  );

  readonly wishlistItems$ = this.store$.pipe(
    select(CartStoreSelectors.selectAll),
    takeUntil(this.destroy$),
  );

  readonly totalPrice$ = this.wishlistItems$.pipe(
    map(item => item.reduce((previous, current) => previous + current.price, 0)),
    takeUntil(this.destroy$),
  );

  constructor(private readonly store$: Store<AppStoreState.State>) { }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  trackById(product: ProductListing): number {
    return product.productId;
  }

  onRemoveItem(productId: number): void {
    this.store$.dispatch(CartStoreActions.removeCartItem({ productId }));
  }
}
