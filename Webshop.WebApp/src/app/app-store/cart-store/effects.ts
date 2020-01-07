import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, map, switchMap } from 'rxjs/operators';
import { CartService } from 'src/app/core/cart/cart.service';
import { CartStoreActions } from '.';
import * as cartActions from './actions';

@Injectable()
export class CartEffects {
  readonly getCartEffect$ = createEffect(() => this.actions$.pipe(
    ofType(cartActions.getCart),
    switchMap(() => this.cartService.getCart().pipe(
      map(cartItems => cartActions.getCartSuccess({ cartItems })),
      catchError(error => of(cartActions.getCartFailure({ error }))),
    ))
  ));

  readonly addCartItemEffect$ = createEffect(() => this.actions$.pipe(
    ofType(cartActions.addCartItem),
    exhaustMap(action => this.cartService.addCartItem(action.productId).pipe(
      map(cartItem => cartActions.addCartItemSuccess({ cartItem })),
      catchError(error => of(cartActions.addCartItemFailure({ error }))),
    ))
  ));

  readonly removeCartItemEffect$ = createEffect(() => this.actions$.pipe(
    ofType(cartActions.removeCartItem),
    exhaustMap(action => this.cartService.removeCartItem(action.cartItemId).pipe(
      map(cartItemId => cartActions.removeCartItemSuccess({ cartItemId })),
      catchError(error => of(cartActions.removeCartItemFailure({ error }))),
    ))
  ));

  constructor(
    private readonly cartService: CartService,
    private readonly actions$: Actions<CartStoreActions.CartActionUnion>,
  ) {}
}
