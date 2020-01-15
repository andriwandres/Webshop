import { Component, OnInit } from '@angular/core';
import { AppStoreState } from './app-store';
import { Store } from '@ngrx/store';
import { AuthStoreActions } from './app-store/auth-store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private readonly store$: Store<AppStoreState.State>) {}

  ngOnInit(): void {
    this.store$.dispatch(AuthStoreActions.authenticate());
  }
}
