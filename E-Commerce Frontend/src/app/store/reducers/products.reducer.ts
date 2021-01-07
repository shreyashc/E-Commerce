import { ProductAction, ProductActionTypes } from '../actions/products.actions';
import { ProductsState } from '../models/app-state.model';

const initialState: ProductsState = {
  list: [],
  loading: false,
  error: undefined,
};

export function ShoppingReducer(
  state: ProductsState = initialState,
  action: ProductAction
) {
  switch (action.type) {
    case ProductActionTypes.GET_ALL_PRODUCTS:
      return {
        ...state,
        loading: true,
      };
    case ProductActionTypes.GET_ALL_PRODUCTS_SUCCESS:
      return {
        ...state,
        list: action.payload,
        loading: false,
      };

    case ProductActionTypes.GET_ALL_PRODUCTS_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
}
