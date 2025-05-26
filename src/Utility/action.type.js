// Action type constants for use in reducers and dispatch calls
export const Type = {
  // Add an item to the shopping basket/cart
  ADD_TO_BASKET: "ADD_TO_BASKET",

  // Remove an item from the shopping basket/cart
  REMOVE_FROM_BASKET: "REMOVE_FROM_BASKET",

  // Set or update the authenticated user in global state
  SET_USER: "SET_USER",

  // Empty the entire shopping basket/cart (clear all items)
  EMPTY_BASKET: "EMPTY_BASKET",
};
