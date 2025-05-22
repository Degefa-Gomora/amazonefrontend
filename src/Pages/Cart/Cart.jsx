
import React, { useContext, useEffect } from "react";
import classes from "./Cart.module.css";
import LayOut from "../../Components/LayOut/LayOut.jsx";
import { DataContext } from "../../Components/DataProvider/DataProvider.jsx";
import ProductCard from "../../Components/Product/ProductCard";
import CurrencyFormat from "../../Components/CurrencyFormat/CurrencyFormat.jsx";
import { Link } from "react-router-dom";
import { Type } from "../../Utility/action.type.js";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

function Cart() {
  const { state, dispatch } = useContext(DataContext);
  const { basket, user } = state || { basket: [], user: null };

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

  const total = basket
    ?.reduce(
      (amount, item) => amount + (item.price || 0) * (item.amount || 0),
      0
    )
    .toFixed(2);
  const totalItems = basket?.length
    ? basket.reduce((sum, item) => sum + (item.amount || 0), 0)
    : 0;
  console.log("Total items:", totalItems);

  const increment = (item) => {
    console.log("Incrementing item:", item);
    dispatch({
      type: Type.ADD_TO_BASKET,
      item,
    });
  };

  const decrement = (id) => {
    console.log("Decrementing id:", id);
    dispatch({
      type: Type.REMOVE_FROM_BASKET,
      id,
    });
  };

  return (
    <LayOut>
      <section className={classes.container}>
        <div className={classes.cart_container}>
          <h2>Hello</h2>
          <h3>Your Shopping Basket</h3>
          <hr />
          {basket?.length === 0 ? (
            <p>Oops! Your basket is empty</p>
          ) : (
            basket?.map((item) => (
              <section className={classes.cart_product} key={item.id}>
                <ProductCard
                  product={item}
                  flex={true}
                  renderDesc={true}
                  renderAdd={false}
                />
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
        <div className={classes.subtotal}>
          <div>
            <h3>Subtotal ({totalItems} items):</h3>
            <CurrencyFormat amount={total} />
          </div>
          <span>
            <input type="checkbox" className={classes.checkbox} name="" id="" />
            <small>This order contains a gift</small>
          </span>
          <Link to="/payment">Continue to checkout</Link>
        </div>
      </section>
    </LayOut>
  );
}

export default Cart;