
import { Type } from "./action.type";

export const initialState = {
  basket: [],
  user: null,
};

export const reducer = (state, action) => {
  // console.log(action)//contain type property
  switch (action.type) {
    case Type.ADD_TO_BASKET:
      const existingItem = state.basket.find(
        (item) => item.id === action.item.id
      );
      if (existingItem) {
        return {
          ...state,
          basket: state.basket.map((item) =>
            item.id === action.item.id
              ? { ...item, amount: item.amount + 1 }
              : item
          ),
        };
      } else {
        return {
          ...state,
          basket: [...state.basket, { ...action.item, amount: 1 }],
        };
      }

    case Type.REMOVE_FROM_BASKET:
      return {
        ...state,
        basket: state.basket
          .map((item) =>
            item.id === action.id ? { ...item, amount: item.amount - 1 } : item
          )
          .filter((item) => item.amount > 0), // Remove item if amount hits 0
      };

    case Type.EMPTY_BASKET:
      return {
        ...state,
        basket: [],
      };

    case Type.SET_USER:
      return {
        ...state,
        user: action.user,
      };
    default:
      return state;
  }
};
