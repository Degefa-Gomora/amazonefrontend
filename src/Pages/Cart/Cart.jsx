// Importing required modules and components
import React, { useContext, useEffect } from "react";
// Importing CSS module for Cart component styling
import classes from "./Cart.module.css";
// Importing layout wrapper component
import LayOut from "../../Components/LayOut/LayOut.jsx";
// Importing global state (context) from DataProvider
import { DataContext } from "../../Components/DataProvider/DataProvider.jsx";
// Importing reusable product display card
import ProductCard from "../../Components/Product/ProductCard";
// Importing utility component for formatting currency
import CurrencyFormat from "../../Components/CurrencyFormat/CurrencyFormat.jsx";
// Importing routing utility to navigate
import { Link } from "react-router-dom";
// Importing custom action types used for reducer dispatch
import { Type } from "../../Utility/action.type.js";
// Importing arrow icons for increment/decrement buttons
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

function Cart() {
  // Extracting global state and dispatch from context
  const { state, dispatch } = useContext(DataContext);
  // Destructuring basket and user from state
  const { basket, user } = state || { basket: [], user: null };

  // Debug useEffect to log current basket state and item info whenever basket updates
  useEffect(() => {
    console.log("Basket state:", basket);
    console.log(
      "Basket items:",
      basket.map((item) => ({
        id: item.id,
        amount: item.amount,
        price: item.price,
      }))
    );
  }, [basket]);

  // Calculate total price of items in the basket
  const total = basket
    ?.reduce(
      (amount, item) => amount + (item.price || 0) * (item.amount || 0),
      0
    )
    .toFixed(2);

  // Calculate total number of items in the basket
  const totalItems = basket?.length
    ? basket.reduce((sum, item) => sum + (item.amount || 0), 0)
    : 0;

  // Debug total number of items in basket
  console.log("Total items:", totalItems);

  // Function to increase the quantity of an item in the basket
  const increment = (item) => {
    console.log("Incrementing item:", item);
    dispatch({
      type: Type.ADD_TO_BASKET,
      item,
    });
  };

  // Function to decrease the quantity or remove an item from the basket
  const decrement = (id) => {
    console.log("Decrementing id:", id);
    dispatch({
      type: Type.REMOVE_FROM_BASKET,
      id,
    });
  };

  return (
    // Wrap cart content inside common layout component
    <LayOut>
      <section className={classes.container}>
        <div className={classes.cart_container}>
          <h2>Hello</h2>
          <h3>Your Shopping Basket</h3>
          <hr />
          {/* Show empty basket message or list items */}
          {basket?.length === 0 ? (
            <p>Oops! Your basket is empty</p>
          ) : (
            // Map through basket items and render each product
            basket?.map((item) => (
              <section className={classes.cart_product} key={item.id}>
                <ProductCard
                  product={item}
                  flex={true} // Display product in flex layout
                  renderDesc={true} // Show product description
                  renderAdd={false} // Hide "Add to Cart" button
                />
                {/* Increment/Decrement buttons for product quantity */}
                <div className={classes.btn_container}>
                  <button
                    className={classes.btn}
                    onClick={() => increment(item)}
                  >
                    <IoIosArrowUp size={25} />
                  </button>
                  <span>{item.amount || 0}</span>
                  <button
                    className={classes.btn}
                    onClick={() => decrement(item.id)}
                  >
                    <IoIosArrowDown size={25} />
                  </button>
                </div>
              </section>
            ))
          )}
        </div>
        {/* Subtotal section with item count and total price */}
        <div className={classes.subtotal}>
          <div>
            <h3>Subtotal ({totalItems} items):</h3>
            <CurrencyFormat amount={total} />
          </div>
          {/* Optional gift checkbox */}
          <span>
            <input type="checkbox" className={classes.checkbox} name="" id="" />
            <small>This order contains a gift</small>
          </span>
          {/* Link to proceed to checkout */}
          <Link to="/payment">Continue to checkout</Link>
        </div>
      </section>
    </LayOut>
  );
}

// Exporting Cart component as default
export default Cart;
















































































































// import React, { useContext, useEffect } from "react";
// import classes from "./Cart.module.css";
// import LayOut from "../../Components/LayOut/LayOut.jsx";
// import { DataContext } from "../../Components/DataProvider/DataProvider.jsx";
// import ProductCard from "../../Components/Product/ProductCard";
// import CurrencyFormat from "../../Components/CurrencyFormat/CurrencyFormat.jsx";
// import { Link } from "react-router-dom";
// import { Type } from "../../Utility/action.type.js";
// import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

// function Cart() {
//   const { state, dispatch } = useContext(DataContext);
//   const { basket, user } = state || { basket: [], user: null };

//   useEffect(() => {
//     console.log("Basket state:", basket);
//     console.log(
//       "Basket items:",
//       basket.map((item) => ({
//         id: item.id,
//         amount: item.amount,
//         price: item.price,
//       }))
//     );
//   }, [basket]);

//   const total = basket
//     ?.reduce(
//       (amount, item) => amount + (item.price || 0) * (item.amount || 0),
//       0
//     )
//     .toFixed(2);
//   const totalItems = basket?.length
//     ? basket.reduce((sum, item) => sum + (item.amount || 0), 0)
//     : 0;
//   console.log("Total items:", totalItems);

//   const increment = (item) => {
//     console.log("Incrementing item:", item);
//     dispatch({
//       type: Type.ADD_TO_BASKET,
//       item,
//     });
//   };

//   const decrement = (id) => {
//     console.log("Decrementing id:", id);
//     dispatch({
//       type: Type.REMOVE_FROM_BASKET,
//       id,
//     });
//   };

//   return (
//     <LayOut>
//       <section className={classes.container}>
//         <div className={classes.cart_container}>
//           <h2>Hello</h2>
//           <h3>Your Shopping Basket</h3>
//           <hr />
//           {basket?.length === 0 ? (
//             <p>Oops! Your basket is empty</p>
//           ) : (
//             basket?.map((item) => (
//               <section className={classes.cart_product} key={item.id}>
//                 <ProductCard
//                   product={item}
//                   flex={true}
//                   renderDesc={true}
//                   renderAdd={false}
//                 />
//                 <div className={classes.btn_container}>
//                   <button
//                     className={classes.btn}
//                     onClick={() => increment(item)}
//                   >
//                     <IoIosArrowUp size={25} />
//                   </button>
//                   <span>{item.amount || 0}</span>
//                   <button
//                     className={classes.btn}
//                     onClick={() => decrement(item.id)}
//                   >
//                     <IoIosArrowDown size={25} />
//                   </button>
//                 </div>
//               </section>
//             ))
//           )}
//         </div>
//         <div className={classes.subtotal}>
//           <div>
//             <h3>Subtotal ({totalItems} items):</h3>
//             <CurrencyFormat amount={total} />
//           </div>
//           <span>
//             <input type="checkbox" className={classes.checkbox} name="" id="" />
//             <small>This order contains a gift</small>
//           </span>
//           <Link to="/payment">Continue to checkout</Link>
//         </div>
//       </section>
//     </LayOut>
//   );
// }

// export default Cart;
