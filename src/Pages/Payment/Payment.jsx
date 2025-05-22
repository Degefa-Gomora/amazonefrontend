



import React, { useContext, useState } from "react";
import classes from "./Payment.module.css";
import LayOut from "../../Components/LayOut/LayOut";
import { DataContext } from "../../Components/DataProvider/DataProvider";
import ProductCard from "../../Components/Product/ProductCard";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import CurrencyFormat from "../../Components/CurrencyFormat/CurrencyFormat";
import { axiosInstance } from "../../Api/axios";
import { ClipLoader } from "react-spinners";
import {db}  from "../../Utility/firebase";
import { doc, collection, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { Type } from "../../Utility/action.type";

function Payment() {
  const { state,dispatch } = useContext(DataContext);
  const { user, basket } = state || { user: null, basket: [] }; // Fallback to avoid undefined errors
  const totalItem =
    basket?.reduce((amount, item) => amount + item.amount, 0) || 0;
  const totalAmount =
    basket?.reduce((amount, item) => amount + item.price * item.amount, 0) || 0;
  const total = totalAmount.toFixed(2);
  const amountInCents = Math.round(totalAmount * 100); // Stripe expects amount in cents

  const [error, setError] = useState(null);
  const [processing,setProcessing] = useState(false)
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate()

  const handleChange = (event) => {
    setError(event?.error?.message || null);
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    // Check if Stripe and Elements are loaded
    if (!stripe || !elements) {
      setError("Stripe has not loaded yet. Please try again.");
      return;
    }

    // Get CardElement
    const cardElement = elements.getElement(CardElement);
    if (!cardElement) {
      setError("Card details are invalid. Please try again.");
      return;
    }

    try {
      setProcessing(true)
      // 1. Contact backend to get clientSecret
      const response = await axiosInstance.post(
        `/payment/create?total=${amountInCents}`
      );
      const clientSecret = response.data?.clientSecret;

      if (!clientSecret) {
        setError("Failed to retrieve payment details from server.");
        return;
      }

      // 2. Confirm payment with Stripe
      const { error, paymentIntent } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: cardElement,
            billing_details: {
              email: user?.email || "unknown@example.com", // Optional: Add billing details
            },
          },
        }
      );
      // console.log(paymentIntent)
      //3. after confirmation clear basket and  order firestore database
      await setDoc(
        doc(collection(db, "user", user.uid, "orders"), paymentIntent.id),
        {
          basket: basket,
          amount: paymentIntent.amount,
          created: paymentIntent.created,
        }
      );
      //4.make basket empty 
        dispatch({type:Type.EMPTY_BASKET})
      setProcessing(false);
      navigate("/Orders", {state:{msg:"You have placed new orders"}})

      if (error) {
        setError(error.message);
        setProcessing(false)
        return;
      }

      if (paymentIntent.status === "succeeded") {
        // Payment successful, handle success (e.g., redirect or show confirmation)
        // console.log("Payment successful:", paymentIntent);
        setError(null);
        // Optionally, redirect to a success page or clear the basket
      } else {
        setError("Payment failed. Please try again.");
      }
    } catch (error) {
      console.error("Payment error:", error);
      setError("An error occurred during payment. Please try again.");
    }
  };

  return (
    <LayOut>
      {/* Header */}
      <div className={classes.payment_header}>Checkout ({totalItem} items)</div>
      <hr />
      {/* Payment Section */}
      <section className={classes.payment_container}>
        <div className={classes.flex}>
          <h3>Delivery Address</h3>
          <div>
            <div>{user?.email || "Guest"}</div>
            <div>Street</div>
            <div>Town</div>
          </div>
        </div>
        <div className={classes.flex}>
          <h3>Review Items and Delivery</h3>
          <div>
            {basket?.length ? (
              basket.map((item) => (
                <ProductCard key={item.id} product={item} flex={true} />
              ))
            ) : (
              <p>No items in the basket.</p>
            )}
          </div>
        </div>
        <hr />
        <div className={classes.flex}>
          <h3>Payment Method</h3>
          <div className={classes.payment_method}>
            <div className={classes.payment_details}>
              <form onSubmit={submitHandler}>
                {/* Error Display */}
                {error && (
                  <small style={{ color: "red", fontWeight: "bold" }}>
                    {error}
                  </small>
                )}
                {/* Card Input */}
                <CardElement onChange={handleChange} />
                {/* Price and Submit */}
                <div className={classes.payment_price}>
                  <div>
                    <span style={{ display: "flex", gap: "10px" }}>
                      <p>Total Order</p> | <CurrencyFormat amount={total} />
                    </span>
                  </div>
                  <button type="submit" disabled={!stripe || !elements}>
                    {processing ? (
                      <div className={classes.loading}>
                        <ClipLoader color="black" size={20} />
                        <p>Please wait ...</p>
                      </div>
                    ) : (
                      "Pay Now"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </LayOut>
  );
}

export default Payment;