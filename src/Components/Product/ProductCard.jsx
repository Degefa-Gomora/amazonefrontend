import React from 'react'
import Rating from "@mui/material/Rating";
import CurrencyFormat from "../CurrencyFormat/CurrencyFormat.jsx";
import classes from "./Product.module.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { DataContext } from "../DataProvider/DataProvider.jsx";
import { Type } from "../../Utility/action.type.js";


function ProductCard({ product, flex, renderDesc,renderAdd }) {
  const { image, title, id, rating, price,description } = product;

  const { state, dispatch } = useContext(DataContext);
  // console.log(state);
  const addToCart = () => {
    dispatch({
      type: Type.ADD_TO_BASKET,
      item: {
        id,
        title,
        image,
        price,
        rating,
        description
      },
    });
  }

  return (
    <div
      className={`${classes.card_container} ${
        flex ? classes.product_flexed : ""
      }`}
    >
      <Link to={`/products/${id}`}>
        <img src={image} alt="" />
      </Link>
      <div>
        <br />
        <br />
        <br />
        <div>
          <h3>{title}</h3>
          {renderDesc && <p style={{ maxWidth: "760px" }}>{description}</p>}
        </div>
        <br />

        <div className={classes.rating}>
          {/* rating */}
          <Rating value={rating?.rate || 0} precision={0.1} />
          {/* count */}
          <small>{rating?.count || 0}</small>
        </div>
        <br />
        <div>
          {/* price */}
          <CurrencyFormat amount={price} />
        </div>
        <br />

        <div>
          { renderAdd && <button className={classes.button} onClick={addToCart}>Add to cart</button>}
        </div>
      </div>
    </div>
  );
}

export default ProductCard;