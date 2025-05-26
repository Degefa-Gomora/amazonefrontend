
import { Type } from "./action.type";

// Initial global state for the app
export const initialState = {
  basket: [], // Shopping basket starts empty
  user: null, // No authenticated user initially
};

// Reducer function to handle actions and update state accordingly
export const reducer = (state, action) => {
  // console.log(action); // Uncomment for debugging dispatched actions

  switch (action.type) {
    // Add an item to the basket, or increase its amount if already present
    case Type.ADD_TO_BASKET:
      // Check if the item is already in the basket
      const existingItem = state.basket.find(
        (item) => item.id === action.item.id
      );

      if (existingItem) {
        // If item exists, increase its amount by 1
        return {
          ...state,
          basket: state.basket.map((item) =>
            item.id === action.item.id
              ? { ...item, amount: item.amount + 1 }
              : item
          ),
        };
      } else {
        // If item does not exist, add it with an initial amount of 1
        return {
          ...state,
          basket: [...state.basket, { ...action.item, amount: 1 }],
        };
      }

    // Remove one quantity of an item from the basket, and remove completely if amount reaches 0
    case Type.REMOVE_FROM_BASKET:
      return {
        ...state,
        basket: state.basket
          .map((item) =>
            item.id === action.id
              ? { ...item, amount: item.amount - 1 } // Decrement amount by 1
              : item
          )
          .filter((item) => item.amount > 0), // Filter out items with amount 0
      };

    // Clear the entire basket, emptying it
    case Type.EMPTY_BASKET:
      return {
        ...state,
        basket: [],
      };

    // Set or update the authenticated user in the global state
    case Type.SET_USER:
      return {
        ...state,
        user: action.user,
      };

    // Default case returns current state unchanged
    default:
      return state;
  }
};




















































































































































































// import { Type } from "./action.type";

// export const initialState = {
//   basket: [],
//   user: null,
// };

// // The amount property is not part of the original state (initialState). Instead, it is dynamically added to items in the basket array when they are handled in the reducer, specifically in the ADD_TO_BASKET case.

// // Where amount is introduced:

// // basket: [...state.basket, { ...action.item, amount: 1 }],
// // This line occurs when a new item is added to the basket. It takes the incoming action.item (which comes from, say, a product fetched from https://fakestoreapi.com/products) and spreads it into a new object while adding a new amount property initialized to 1.

// // What happens next:
// // On future ADD_TO_BASKET actions, if the item already exists in the basket (existingItem), its amount is incremented:

// // { ...item, amount: item.amount + 1 }
// // On REMOVE_FROM_BASKET, the amount is decremented, and the item is filtered out if its amount drops to 0:

// export const reducer = (state, action) => {
//   //console.log(action); // item.id from https://fakestoreapi.com/products
//   switch (action.type) {
//     case Type.ADD_TO_BASKET:
//       const existingItem = state.basket.find(
//         (item) => item.id === action.item.id
//       );
//       if (existingItem) {
//         return {
//           ...state,
//           basket: state.basket.map((item) =>
//             item.id === action.item.id
//               ? { ...item, amount: item.amount + 1 }
//               : item
//           ),
//         };
//       } else {
//         return {
//           ...state,
//           basket: [...state.basket, { ...action.item, amount: 1 }], //here where we introduced the amount property
//         };
//       }

//     case Type.REMOVE_FROM_BASKET:
//       return {
//         ...state,
//         basket: state.basket
//           .map((item) =>
//             item.id === action.id ? { ...item, amount: item.amount - 1 } : item
//           )
//           .filter((item) => item.amount > 0), // Remove item if amount hits 0
//       };

//     case Type.EMPTY_BASKET:
//       return {
//         ...state,
//         basket: [],
//       };

//     case Type.SET_USER:
//       return {
//         ...state,
//         user: action.user,
//       };
//     default:
//       return state;
//   }
// };
