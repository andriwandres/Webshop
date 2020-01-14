import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppStoreState } from 'src/app/app-store';
import { Subject } from 'rxjs';
import { ReviewStoreSelectors, ReviewStoreActions } from 'src/app/app-store/review-store';
import { takeUntil } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.scss']
})
export class ReviewsComponent implements OnInit, OnDestroy {
  private readonly destroy$ = new Subject<void>();

  readonly reviews$ = this.store$.pipe(
    select(ReviewStoreSelectors.selectAll),
    takeUntil(this.destroy$),
  );

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly store$: Store<AppStoreState.State>,
  ) { }

  ngOnInit(): void {
    const productId = +this.activatedRoute.snapshot.paramMap.get('id');

    this.store$.dispatch(ReviewStoreActions.loadReviews({ productId }));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
