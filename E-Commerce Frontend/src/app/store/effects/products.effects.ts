import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { EcapiService } from 'src/app/services/ecapi.service';
import {
  LoadProductsAction,
  LoadProductsFailureAction,
  LoadProductsSuccessAction,
  ProductActionTypes,
} from '../actions/products.actions';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class ProductsEffects {
  @Effect()
  loadProducts$ = this.actions$.pipe(
    ofType<LoadProductsAction>(ProductActionTypes.GET_ALL_PRODUCTS),
    mergeMap(() =>
      this.ecService.getAllProducts().pipe(
        map((data) => {
          return new LoadProductsSuccessAction(data);
        }),
        catchError((error) => of(new LoadProductsFailureAction(error)))
      )
    )
  );
  constructor(private actions$: Actions, private ecService: EcapiService) {}
}
