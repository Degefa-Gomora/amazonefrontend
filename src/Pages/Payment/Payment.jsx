// Import React hooks and components
import React, { useContext, useState } from "react";
// Import CSS module for scoped styles
import classes from "./Payment.module.css";
// Layout wrapper for consistent app UI
import LayOut from "../../Components/LayOut/LayOut";
// Import global state context
import { DataContext } from "../../Components/DataProvider/DataProvider";
// Reusable card component to display basket items
import ProductCard from "../../Components/Product/ProductCard";
// Stripe hooks and components for secure payment input
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
// Component for formatting currency
import CurrencyFormat from "../../Components/CurrencyFormat/CurrencyFormat";
// Axios instance for API calls
import { axiosInstance } from "../../Api/axios";
// Spinner for loading state
import { ClipLoader } from "react-spinners";
// Firebase Firestore database import
import { db } from "../../Utility/firebase";
// Firestore methods to set order documents
import { doc, collection, setDoc } from "firebase/firestore";
// React Router hook for redirection
import { useNavigate } from "react-router-dom";
// Action types for context dispatch
import { Type } from "../../Utility/action.type";

function Payment() {
  // Global state values
  const { state, dispatch } = useContext(DataContext);
  const { user, basket } = state || { user: null, basket: [] };

  // Calculate total items and amount
  const totalItem =
    basket?.reduce((amount, item) => amount + item.amount, 0) || 0;
  const totalAmount =
    basket?.reduce((amount, item) => amount + item.price * item.amount, 0) || 0;
  const total = totalAmount.toFixed(2);
  const amountInCents = Math.round(totalAmount * 100); // Required by Stripe

  // Local component states
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);

  // Stripe and form utilities
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  // Handles changes in the card input
  const handleChange = (event) => {
    setError(event?.error?.message || null);
  };

  // Submits payment to backend and processes it
  const submitHandler = async (event) => {
    event.preventDefault();

    // Stripe must be ready
    if (!stripe || !elements) {
      setError("Stripe has not loaded yet. Please try again.");
      return;
    }

    // Get the CardElement input
    const cardElement = elements.getElement(CardElement);
    if (!cardElement) {
      setError("Card details are invalid. Please try again.");
      return;
    }

    try {
      setProcessing(true);

      // Step 1: Get client secret from backend
      const response = await axiosInstance.post(
        `/payment/create?total=${amountInCents}`
      );
      const clientSecret = response.data?.clientSecret;

      if (!clientSecret) {
        setError("Failed to retrieve payment details from server.");
        return;
      }

      // Step 2: Confirm card payment using Stripe
      const { error, paymentIntent } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: cardElement,
            billing_details: {
              email: user?.email || "unknown@example.com",
            },
          },
        }
      );

      // Step 3: Save order in Firestore if payment is successful
      await setDoc(
        doc(collection(db, "user", user.uid, "orders"), paymentIntent.id),
        {
          basket: basket,
          amount: paymentIntent.amount,
          created: paymentIntent.created,
        }
      );

      // Step 4: Clear basket and navigate to orders
      dispatch({ type: Type.EMPTY_BASKET });
      setProcessing(false);
      navigate("/Orders", { state: { msg: "You have placed new orders" } });

      // Handle Stripe errors if any
      if (error) {
        setError(error.message);
        setProcessing(false);
        return;
      }

      if (paymentIntent.status === "succeeded") {
        setError(null);
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
      {/* Header section */}
      <div className={classes.payment_header}>Checkout ({totalItem} items)</div>
      <hr />

      {/* Main payment section */}
      <section className={classes.payment_container}>
        {/* Delivery Address Section */}
        <div className={classes.flex}>
          <h3>Delivery Address</h3>
          <div>
            <div>{user?.email || "Guest"}</div>
            <div>Street</div>
            <div>Town</div>
          </div>
        </div>

        {/* Review Items Section */}
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
        {/* Payment Method Section */}
        <div className={classes.flex}>
          <h3>Payment Method</h3>
          <div className={classes.payment_method}>
            <div className={classes.payment_details}>
              <form onSubmit={submitHandler}>
                {/* Display errors if any */}
                {error && (
                  <small style={{ color: "red", fontWeight: "bold" }}>
                    {error}
                  </small>
                )}

                {/* Stripe Card input */}
                <CardElement onChange={handleChange} />

                {/* Display total and submit button */}
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
// Export the Payment component
export default Payment;




































































































// import React, { useContext, useState } from "react";
// import classes from "./Payment.module.css";
// import LayOut from "../../Components/LayOut/LayOut";
// import { DataContext } from "../../Components/DataProvider/DataProvider";
// import ProductCard from "../../Components/Product/ProductCard";
// import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
// import CurrencyFormat from "../../Components/CurrencyFormat/CurrencyFormat";
// import { axiosInstance } from "../../Api/axios";
// import { ClipLoader } from "react-spinners";
// import {db}  from "../../Utility/firebase";
// import { doc, collection, setDoc } from "firebase/firestore";
// import { useNavigate } from "react-router-dom";
// import { Type } from "../../Utility/action.type";

// function Payment() {
//   const { state,dispatch } = useContext(DataContext);
//   const { user, basket } = state || { user: null, basket: [] }; // Fallback to avoid undefined errors
//   const totalItem =
//     basket?.reduce((amount, item) => amount + item.amount, 0) || 0;
//   const totalAmount =
//     basket?.reduce((amount, item) => amount + item.price * item.amount, 0) || 0;
//   const total = totalAmount.toFixed(2);
//   const amountInCents = Math.round(totalAmount * 100); // Stripe expects amount in cents

//   const [error, setError] = useState(null);
//   const [processing,setProcessing] = useState(false)
//   const stripe = useStripe();
//   const elements = useElements();
//   const navigate = useNavigate()

//   const handleChange = (event) => {
//     setError(event?.error?.message || null);
//   };

//   const submitHandler = async (event) => {
//     event.preventDefault();

//     // Check if Stripe and Elements are loaded
//     if (!stripe || !elements) {
//       setError("Stripe has not loaded yet. Please try again.");
//       return;
//     }

//     // Get CardElement
//     const cardElement = elements.getElement(CardElement);
//     if (!cardElement) {
//       setError("Card details are invalid. Please try again.");
//       return;
//     }

//     try {
//       setProcessing(true)
//       // 1. Contact backend to get clientSecret
//       const response = await axiosInstance.post(
//         `/payment/create?total=${amountInCents}`
//       );
//       const clientSecret = response.data?.clientSecret;

//       if (!clientSecret) {
//         setError("Failed to retrieve payment details from server.");
//         return;
//       }

//       // 2. Confirm payment with Stripe
//       const { error, paymentIntent } = await stripe.confirmCardPayment(
//         clientSecret,
//         {
//           payment_method: {
//             card: cardElement,
//             billing_details: {
//               email: user?.email || "unknown@example.com", // Optional: Add billing details
//             },
//           },
//         }
//       );
//       // console.log(paymentIntent)
//       //3. after confirmation clear basket and  order firestore database
//       await setDoc(
//         doc(collection(db, "user", user.uid, "orders"), paymentIntent.id),
//         {
//           basket: basket,
//           amount: paymentIntent.amount,
//           created: paymentIntent.created,
//         }
//       );
//       //4.make basket empty
//         dispatch({type:Type.EMPTY_BASKET})
//       setProcessing(false);
//       navigate("/Orders", {state:{msg:"You have placed new orders"}})

//       if (error) {
//         setError(error.message);
//         setProcessing(false)
//         return;
//       }

//       if (paymentIntent.status === "succeeded") {
//         // Payment successful, handle success (e.g., redirect or show confirmation)
//         // console.log("Payment successful:", paymentIntent);
//         setError(null);
//         // Optionally, redirect to a success page or clear the basket
//       } else {
//         setError("Payment failed. Please try again.");
//       }
//     } catch (error) {
//       console.error("Payment error:", error);
//       setError("An error occurred during payment. Please try again.");
//     }
//   };

//   return (
//     <LayOut>
//       {/* Header */}
//       <div className={classes.payment_header}>Checkout ({totalItem} items)</div>
//       <hr />
//       {/* Payment Section */}
//       <section className={classes.payment_container}>
//         <div className={classes.flex}>
//           <h3>Delivery Address</h3>
//           <div>
//             <div>{user?.email || "Guest"}</div>
//             <div>Street</div>
//             <div>Town</div>
//           </div>
//         </div>
//         <div className={classes.flex}>
//           <h3>Review Items and Delivery</h3>
//           <div>
//             {basket?.length ? (
//               basket.map((item) => (
//                 <ProductCard key={item.id} product={item} flex={true} />
//               ))
//             ) : (
//               <p>No items in the basket.</p>
//             )}
//           </div>
//         </div>
//         <hr />
//         <div className={classes.flex}>
//           <h3>Payment Method</h3>
//           <div className={classes.payment_method}>
//             <div className={classes.payment_details}>
//               <form onSubmit={submitHandler}>
//                 {/* Error Display */}
//                 {error && (
//                   <small style={{ color: "red", fontWeight: "bold" }}>
//                     {error}
//                   </small>
//                 )}
//                 {/* Card Input */}
//                 <CardElement onChange={handleChange} />
//                 {/* Price and Submit */}
//                 <div className={classes.payment_price}>
//                   <div>
//                     <span style={{ display: "flex", gap: "10px" }}>
//                       <p>Total Order</p> | <CurrencyFormat amount={total} />
//                     </span>
//                   </div>
//                   <button type="submit" disabled={!stripe || !elements}>
//                     {processing ? (
//                       <div className={classes.loading}>
//                         <ClipLoader color="black" size={20} />
//                         <p>Please wait ...</p>
//                       </div>
//                     ) : (
//                       "Pay Now"
//                     )}
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       </section>
//     </LayOut>
//   );
// }

// export default Payment;
