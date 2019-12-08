import { animate, state, style, transition, trigger } from '@angular/animations';
import { ChangeDetectionStrategy, Component, HostBinding, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ofType } from '@ngrx/effects';
import { ActionsSubject, select, Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, skipWhile, takeUntil } from 'rxjs/operators';
import { AppStoreState } from 'src/app/app-store';
import { AuthStoreActions, AuthStoreSelectors } from 'src/app/app-store/auth-store';
import { RegisterDto } from 'src/models/auth/register';
import { MustMatch } from './password-match.validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
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
export class RegisterComponent implements OnInit, OnDestroy {
  @HostBinding('@fadeIn') readonly animationBinding: string;

  private readonly destroy$ = new Subject<void>();

  readonly emailTaken$ = this.store$.pipe(
    select(AuthStoreSelectors.selectEmailTaken),
    takeUntil(this.destroy$),
  );

  readonly isLoading$ = this.store$.pipe(
    select(AuthStoreSelectors.selectLoading),
    takeUntil(this.destroy$),
  );

  readonly form = new FormGroup({
    firstname: new FormControl('', [
      Validators.required,
    ]),
    lastname: new FormControl('', [
      Validators.required,
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.email,
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.pattern(/^\S+$/),
    ]),
    passwordConfirm: new FormControl('', [
      Validators.required,
      Validators.pattern(/^\S+$/),
    ])
  }, {
    validators: MustMatch('password', 'passwordConfirm')
  });

  get firstname() { return this.form.get('firstname'); }
  get lastname() { return this.form.get('lastname'); }
  get email() { return this.form.get('email'); }
  get password() { return this.form.get('password'); }
  get passwordConfirm() { return this.form.get('passwordConfirm'); }

  constructor(
    private readonly router: Router,
    private readonly snackbar: MatSnackBar,
    private readonly actionSubject: ActionsSubject,
    private readonly store$: Store<AppStoreState.State>,
  ) { }

  ngOnInit() {
    // Check if email is available
    this.email.valueChanges.pipe(
      skipWhile(() => this.email.invalid),
      debounceTime(1000),
      distinctUntilChanged(),
      takeUntil(this.destroy$)
    ).subscribe((email: string) => {
      this.store$.dispatch(AuthStoreActions.checkEmailTaken({ email }));
    });

    // Navigate to login on success
    this.actionSubject.pipe(
      ofType(AuthStoreActions.registerSuccess),
      takeUntil(this.destroy$),
    ).subscribe(() => {
      this.snackbar.open('Your account has been created', 'Dismiss', {
        duration: 3000,
        verticalPosition: 'bottom',
        horizontalPosition: 'right',
      });

      this.router.navigate(['/auth/login']);
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  submit(): void {
    if (this.form.valid) {
      const credentials = this.form.value as RegisterDto;

      this.store$.dispatch(AuthStoreActions.register({ credentials }));
    }
  }
}
