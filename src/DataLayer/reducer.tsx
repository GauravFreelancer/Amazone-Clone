import { IProduct } from "../models/Product";
import { State } from "../models/State";

export const getBasketTotalAmount = (basket: IProduct[]): number => {
  const data = basket?.reduce((price, item) => price + item.price, 0);
  return data;
};

export const initialState: State = {
  basket: [],
  user: null,
};

const reducer = (state: State, action: any): State => {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.user,
      };
    case "EMPTY_BASKET":
      return {
        ...state,
        basket: []
      };
    case "ADD_TO_BASKET":
      return {
        ...state,
        basket: [...state.basket, action.item],
      };
    case "REMOVE_FROM_BASKET":
      const newBasket = [...state.basket];
      const index = newBasket.findIndex((x) => x.id == action.id);
      if (index >= 0) {
        newBasket.splice(index, 1);
      }
      return {
        ...state,
        basket: newBasket,
      };

    default:
      return state;
  }
};

export default reducer;
