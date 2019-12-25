import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AppStoreState } from 'src/app/app-store';
import { ProductStoreActions, ProductStoreSelectors } from 'src/app/app-store/products-store';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit, OnDestroy {
  private readonly destroy$ = new Subject<void>();

  readonly loading$ = this.store$.pipe(
    select(ProductStoreSelectors.selectLoading),
    takeUntil(this.destroy$),
  );

  readonly product$ = this.store$.pipe(
    select(ProductStoreSelectors.selectSelectedProduct),
    takeUntil(this.destroy$),
  );

  constructor(
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

  onAddToCart(id: number): void {
    console.log(id);
  }

  onAddToWishlist(id: number): void {
    console.log(id);
  }
}
