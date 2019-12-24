import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { merge, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil, tap, map, filter } from 'rxjs/operators';
import { AppStoreState } from 'src/app/app-store';
import { ProductStoreActions } from 'src/app/app-store/products-store';
import { SortCriteria, ProductQuery } from 'src/models/products/productQuery';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit, OnDestroy {
  private readonly destroy$ = new Subject<void>();

  readonly form = new FormGroup({
    filterTerm: new FormControl(''),
    sortCriteria: new FormControl(`${SortCriteria.bestseller}`)
  });

  get filterTerm() { return this.form.get('filterTerm'); }
  get sortCriteria() { return this.form.get('sortCriteria'); }

  constructor(private readonly store$: Store<AppStoreState.State>) { }

  ngOnInit(): void {
    const filter$ = this.filterTerm.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      map(value => value.trim()),
      takeUntil(this.destroy$),
    );

    const sort$ = this.sortCriteria.valueChanges.pipe(
      distinctUntilChanged(),
      takeUntil(this.destroy$)
    );

    merge(filter$, sort$).pipe(
      takeUntil(this.destroy$),
    ).subscribe(() => {
      const query: ProductQuery = {
        filter: this.filterTerm.value,
        sortCriteria: +this.sortCriteria.value as SortCriteria
      };

      this.store$.dispatch(ProductStoreActions.getProducts({ query }));
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
