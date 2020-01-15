import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppStoreState } from 'src/app/app-store';
import { AuthStoreSelectors } from 'src/app/app-store/auth-store';
import { pluck, map, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnDestroy {
  private readonly destroy$ = new Subject<void>();

  readonly user$ = this.store$.pipe(
    select(AuthStoreSelectors.selectUser),
    takeUntil(this.destroy$),
  );

  constructor(private readonly store$: Store<AppStoreState.State>) { }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
