export interface AppState {
  readonly products: ProductsState;
}

export interface ProductsState {
  list: any[];
  loading: boolean;
  error: Error;
}
