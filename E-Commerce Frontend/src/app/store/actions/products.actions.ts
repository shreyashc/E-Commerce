import { Action } from '@ngrx/store';

export enum ProductActionTypes {
  GET_ALL_PRODUCTS = '[PRODUCTS] get all products',
  GET_ALL_PRODUCTS_SUCCESS = '[PRODUCTS] get all products Success',
  GET_ALL_PRODUCTS_FAILURE = '[PRODUCTS] get all products Failure',
}

export class LoadProductsAction implements Action {
  readonly type = ProductActionTypes.GET_ALL_PRODUCTS;
}
export class LoadProductsSuccessAction implements Action {
  readonly type = ProductActionTypes.GET_ALL_PRODUCTS_SUCCESS;

  constructor(public payload: Array<any>) {}
}
export class LoadProductsFailureAction implements Action {
  readonly type = ProductActionTypes.GET_ALL_PRODUCTS_FAILURE;

  constructor(public payload: Error) {}
}

export type ProductAction =
  | LoadProductsAction
  | LoadProductsSuccessAction
  | LoadProductsFailureAction;
