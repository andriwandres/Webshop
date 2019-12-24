import { Component, OnInit, OnDestroy } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { takeUntil } from 'rxjs/operators';
import { ProductStoreSelectors, ProductStoreActions } from 'src/app/app-store/products-store';
import { Subject } from 'rxjs';
import { AppStoreState } from 'src/app/app-store';
import { ProductListing } from 'src/models/products/productListing';
import { ProductQuery, SortCriteria } from 'src/models/products/productQuery';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit, OnDestroy {
  private readonly destroy$ = new Subject<void>();

  readonly products$ = this.store$.pipe(
    select(ProductStoreSelectors.selectAll),
    takeUntil(this.destroy$),
  );

  constructor(private readonly store$: Store<AppStoreState.State>) { }

  ngOnInit(): void {
    const query: ProductQuery = {
      filter: '',
      sortCriteria: SortCriteria.bestseller
    };

    this.store$.dispatch(ProductStoreActions.getProducts({ query }));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  trackById(product: ProductListing): number {
    return product.productId;
  }
}
