import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { ProductsService } from 'src/app/core/products/products.service';
import * as productActions from './actions';
import { Injectable } from '@angular/core';

@Injectable()
export class ProductEffects {
  readonly getProducts$ = createEffect(() => this.actions$.pipe(
    ofType(productActions.getProducts),
    switchMap(action => this.productsService.getProducts(action.query).pipe(
      map(products => productActions.getProductsSuccess({ products })),
      catchError(error => of(productActions.getProductsFailure({ error }))),
    )),
  ));

  readonly getProductDetails$ = createEffect(() => this.actions$.pipe(
    ofType(productActions.getProductDetails),
    switchMap(action => this.productsService.getProductDetails(action.productId).pipe(
      map(product => productActions.getProductDetailsSuccess({ product })),
      catchError(error => of(productActions.getProductDetailsFailure({ error }))),
    ))
  ));

  constructor(
    private readonly productsService: ProductsService,
    private readonly actions$: Actions<productActions.ProductActionUnion>,
  ) {}
}
