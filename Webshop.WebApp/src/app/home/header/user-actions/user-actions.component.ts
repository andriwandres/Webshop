import { Component, OnInit, ViewChild } from '@angular/core';
import { MatMenu } from '@angular/material/menu';
import { Store } from '@ngrx/store';
import { AppStoreState } from 'src/app/app-store';
import { AuthStoreActions } from 'src/app/app-store/auth-store';

@Component({
  selector: 'app-user-actions',
  templateUrl: './user-actions.component.html',
  styleUrls: ['./user-actions.component.scss']
})
export class UserActionsComponent {
  @ViewChild(MatMenu, { static: true }) menu: MatMenu;

  constructor(private readonly store$: Store<AppStoreState.State>) { }

  logout(): void {
    this.store$.dispatch(AuthStoreActions.logout());
  }
}
