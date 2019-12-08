import { animate, state, style, transition, trigger } from '@angular/animations';
import { ChangeDetectionStrategy, Component, OnInit, HostBinding } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ofType } from '@ngrx/effects';
import { ActionsSubject, Store } from '@ngrx/store';
import { take } from 'rxjs/operators';
import { AppStoreState } from 'src/app/app-store';
import { AuthStoreActions } from 'src/app/app-store/auth-store';
import { LoginDto } from 'src/models/auth/login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('fadeIn', [
      state('void', style({
        opacity: 0,
        transform: 'translateY(-25px)'
      })),
      transition(':enter', animate(500)),
    ]),
  ]
})
export class LoginComponent implements OnInit {
  @HostBinding('@fadeIn') readonly animationBinding: string;

  readonly form = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.pattern(/^\S+$/),
    ])
  });

  get email() { return this.form.get('email'); }
  get password() { return this.form.get('password'); }

  constructor(
    private readonly router: Router,
    private readonly actionsSubject: ActionsSubject,
    private readonly store$: Store<AppStoreState.State>,
  ) { }

  ngOnInit(): void {
    // Navigate on login
    this.actionsSubject.pipe(
      ofType(AuthStoreActions.loginSuccess),
      take(1),
    ).subscribe(() => {
      this.router.navigate(['/chats']);
    });
  }

  submit(): void {
    if (this.form.valid) {
      const credentials = this.form.value as LoginDto;

      this.store$.dispatch(AuthStoreActions.login({ credentials }));
    }
  }
}
