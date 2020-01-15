import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AppStoreState } from 'src/app/app-store';
import { ReviewStoreActions, ReviewStoreSelectors } from 'src/app/app-store/review-store';
import { MatDialog } from '@angular/material/dialog';
import { ReviewCreateComponent } from './review-create/review-create.component';
import { Review } from 'src/models/reviews/review';
import { ReviewDto } from 'src/models/reviews/review-dto';

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
    private readonly dialog: MatDialog,
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

  createReview(): void {
    const dialogRef = this.dialog.open(ReviewCreateComponent, {
      minWidth: '500px'
    });

    dialogRef.afterClosed().subscribe((review: ReviewDto) => {
      if (!!review) {
        const productId = +this.activatedRoute.snapshot.paramMap.get('id');
        console.log('dispatch');
        this.store$.dispatch(ReviewStoreActions.createReview({ productId, review }));
      }
    });
  }
}
