import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, map, switchMap } from 'rxjs/operators';
import { WishlistService } from 'src/app/core/wishlist/wishlist.service';
import * as wishlistActions from './actions';

@Injectable()
export class WishlistEffects {
  readonly getWishlistEffect$ = createEffect(() => this.actions$.pipe(
    ofType(wishlistActions.getWishlist),
    switchMap(() => this.wishlistService.getWishlist().pipe(
      map(wishlistItems => wishlistActions.getWishlistSuccess({ wishlistItems })),
      catchError(error => of(wishlistActions.getWishlistFailure({ error }))),
    ))
  ));

  readonly addWishlistItemEffect$ = createEffect(() => this.actions$.pipe(
    ofType(wishlistActions.addWishlistItem),
    exhaustMap(action => this.wishlistService.addWishlistItem(action.productId).pipe(
      map(wishlistItem => wishlistActions.addWishlistItemSuccess({ wishlistItem })),
      catchError(error => of(wishlistActions.addWishlistItemFailure({ error }))),
    ))
  ));

  readonly removeWishlistItemEffect$ = createEffect(() => this.actions$.pipe(
    ofType(wishlistActions.removeWishlistItem),
    exhaustMap(action => this.wishlistService.removeWishlistItem(action.wishlistItemId).pipe(
      map(wishlistItemId => wishlistActions.removeWishlistItemSuccess({ wishlistItemId })),
      catchError(error => of(wishlistActions.removeWishlistItemFailure({ error }))),
    ))
  ));

  constructor(
    private readonly wishlistService: WishlistService,
    private readonly actions$: Actions<wishlistActions.WishlistActionUnion>,
  ) { }
}
