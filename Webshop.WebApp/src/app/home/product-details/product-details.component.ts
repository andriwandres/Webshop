import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store, ActionsSubject } from '@ngrx/store';
import { Subject } from 'rxjs';
import { takeUntil, take } from 'rxjs/operators';
import { AppStoreState } from 'src/app/app-store';
import { ProductStoreActions, ProductStoreSelectors } from 'src/app/app-store/products-store';
import { CartStoreActions, CartStoreSelectors } from 'src/app/app-store/cart-store';
import { WishlistStoreActions } from 'src/app/app-store/wishlist-store';
import { ofType } from '@ngrx/effects';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit, OnDestroy {
  private readonly destroy$ = new Subject<void>();

  readonly product$ = this.store$.pipe(
    select(ProductStoreSelectors.selectSelectedProduct),
    takeUntil(this.destroy$),
  );

  constructor(
    private readonly router: Router,
    private readonly snackbar: MatSnackBar,
    private readonly actionsSubject: ActionsSubject,
    private readonly activatedRoute: ActivatedRoute,
    private readonly store$: Store<AppStoreState.State>,
  ) { }

  ngOnInit(): void {
    const productId = +this.activatedRoute.snapshot.paramMap.get('id');

    this.store$.dispatch(ProductStoreActions.getProductDetails({ productId }));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onAddToCart(productId: number): void {
    this.actionsSubject.pipe(
      ofType(CartStoreActions.addCartItemSuccess),
      take(1),
    ).subscribe(() => {
      this.snackbar.open('Product was added to your cart', '', {
        duration: 3000,
        verticalPosition: 'bottom',
        horizontalPosition: 'right',
      });
      this.router.navigate(['/products']);
    });

    this.store$.dispatch(CartStoreActions.addCartItem({ productId }));
  }

  onAddToWishlist(productId: number): void {
    this.actionsSubject.pipe(
      ofType(WishlistStoreActions.addWishlistItemSuccess),
      take(1),
    ).subscribe(() => {
      this.snackbar.open('Product was added to your wishlist', '', {
        duration: 3000,
        verticalPosition: 'bottom',
        horizontalPosition: 'right',
      });
    });

    this.store$.dispatch(WishlistStoreActions.addWishlistItem({ productId }));
  }
}
