// import React from "react";
// // Importing MUI Rating component to display product rating stars
// import Rating from "@mui/material/Rating";
// // Custom currency formatting component for displaying price
// import CurrencyFormat from "../CurrencyFormat/CurrencyFormat.jsx";
// // Importing CSS module for scoped styling
// import classes from "./Product.module.css";
// // React Router Link for navigation
// import { Link } from "react-router-dom";
// // React hook to access global state context
// import { useContext } from "react";
// // Importing global data context for state management
// import { DataContext } from "../DataProvider/DataProvider.jsx";
// // Importing action types constants for dispatching actions
// import { Type } from "../../Utility/action.type.js";

// function ProductCard({ product, flex, renderDesc, renderAdd }) {
//   // Destructure product details from props
//   const { image, title, id, rating, price, description } = product;

//   // Access global state and dispatch method from DataContext
//   const { state, dispatch } = useContext(DataContext);

//   // Debugging: Log current global state (can be removed in production)
//   console.log(state);

//   // Function to dispatch action to add current product to basket/cart
//   const addToCart = () => {
//     dispatch({
//       type: Type.ADD_TO_BASKET,
//       item: {
//         id,
//         title,
//         image,
//         price,
//         rating,
//         description,
//       },
//     });
//   };

//   return (
//     <div
//       className={`${classes.card_container} ${
//         flex ? classes.product_flexed : ""
//       }`}
//     >
//       {/* Link to product detail page using product id */}
//       <Link to={`/products/${id}`}>
//         <img src={image} alt={title} />
//       </Link>

//       <div>
//         <div>
//           {/* Product title */}
//           <h3>{title}</h3>
//           {/* Conditionally render product description if renderDesc prop is true */}
//           {renderDesc && <p style={{ maxWidth: "760px" }}>{description}</p>}
//         </div>

//         <br />

//         <div className={classes.rating}>
//           {/* Display product rating stars, default to 0 if not available */}
//           <Rating value={rating?.rate || 0} precision={0.1} />
//           {/* Show number of ratings */}
//           <small>{rating?.count || 0}</small>
//         </div>

//         <br />

//         <div>
//           {/* Display formatted price using CurrencyFormat component */}
//           <CurrencyFormat amount={price} />
//         </div>

//         <br />

//         <div>
//           {/* Conditionally render 'Add to cart' button based on renderAdd prop */}
//           {renderAdd && (
//             <button className={classes.button} onClick={addToCart}>
//               Add to cart
//             </button>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// // Exporting ProductCard component for use in product listing pages
// export default ProductCard;














import React from "react";
// Importing MUI Rating component to display product rating stars
import Rating from "@mui/material/Rating";
// Custom currency formatting component for displaying price
import CurrencyFormat from "../CurrencyFormat/CurrencyFormat.jsx";
// Importing CSS module for scoped styling
import classes from "./Product.module.css";
// React Router Link for navigation
import { Link } from "react-router-dom";
// React hook to access global state context
import { useContext } from "react";
// Importing global data context for state management
import { DataContext } from "../DataProvider/DataProvider.jsx";
// Importing action types constants for dispatching actions
import { Type } from "../../Utility/action.type.js";

function ProductCard({ product, flex, renderDesc, renderAdd }) {
  // Destructure product details from props
  const { image, title, id, rating, price, description } = product;

  // Access global state and dispatch method from DataContext
  const { state, dispatch } = useContext(DataContext);

  // Debugging: Log current global state (can be removed in production)
  console.log(state);

  // Function to dispatch action to add current product to basket/cart
  const addToCart = () => {
    dispatch({
      type: Type.ADD_TO_BASKET,
      item: {
        id,
        title,
        image,
        price,
        rating,
        description,
      },
    });
  };

  return (
    <div
      className={`${classes.card_container} ${
        flex ? classes.product_flexed : ""
      }`}
    >
      {/* Link to product detail page using product id */}
      <Link to={`/products/${id}`}>
        {/* ✅ UPDATE THIS LINE TO USE YOUR BACKEND PROXY */}
        <img
          src={`${
            import.meta.env.VITE_BACKEND_URL
          }/image-proxy?url=${encodeURIComponent(image)}`}
          alt={title}
        />
      </Link>

      <div>
        <div>
          {/* Product title */}
          <h3>{title}</h3>
          {/* Conditionally render product description if renderDesc prop is true */}
          {renderDesc && <p style={{ maxWidth: "760px" }}>{description}</p>}
        </div>

        <br />

        <div className={classes.rating}>
          {/* Display product rating stars, default to 0 if not available */}
          <Rating value={rating?.rate || 0} precision={0.1} />
          {/* Show number of ratings */}
          <small>{rating?.count || 0}</small>
        </div>

        <br />

        <div>
          {/* Display formatted price using CurrencyFormat component */}
          <CurrencyFormat amount={price} />
        </div>

        <br />

        <div>
          {/* Conditionally render 'Add to cart' button based on renderAdd prop */}
          {renderAdd && (
            <button className={classes.button} onClick={addToCart}>
              Add to cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// Exporting ProductCard component for use in product listing pages
export default ProductCard;

























































































// import React from 'react'
// import Rating from "@mui/material/Rating";
// import CurrencyFormat from "../CurrencyFormat/CurrencyFormat.jsx";
// import classes from "./Product.module.css";
// import { Link } from "react-router-dom";
// import { useContext } from "react";
// import { DataContext } from "../DataProvider/DataProvider.jsx";
// import { Type } from "../../Utility/action.type.js";

// function ProductCard({ product, flex, renderDesc,renderAdd }) {
//   const { image, title, id, rating, price,description } = product;

//   const { state, dispatch } = useContext(DataContext);
//   console.log(state);
//   const addToCart = () => {
//     dispatch({
//       type: Type.ADD_TO_BASKET,
//       item: {
//         id,
//         title,
//         image,
//         price,
//         rating,
//         description
//       },
//     });
//   }

//   return (
//     <div
//       className={`${classes.card_container} ${
//         flex ? classes.product_flexed : ""
//       }`}
//     >
//       <Link to={`/products/${id}`}>
//         <img src={image} alt="" />
//       </Link>
//       <div>
//         <div>
//           <h3>{title}</h3>
//           {renderDesc && <p style={{ maxWidth: "760px" }}>{description}</p>}
//         </div>
//         <br />

//         <div className={classes.rating}>
//           {/* rating */}
//           <Rating value={rating?.rate || 0} precision={0.1} />
//           {/* count */}
//           <small>{rating?.count || 0}</small>
//         </div>
//         <br />
//         <div>
//           {/* price */}
//           <CurrencyFormat amount={price} />
//         </div>
//         <br />

//         <div>
//           { renderAdd && <button className={classes.button} onClick={addToCart}>Add to cart</button>}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ProductCard;
