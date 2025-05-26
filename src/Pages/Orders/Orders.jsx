// Importing necessary hooks and components
import React, { useContext, useEffect, useState } from "react";
// Importing CSS module for styling the Orders page
import classes from "./Orders.module.css";
// Importing layout wrapper component
import LayOut from "./../../Components/LayOut/LayOut";
// Importing Firebase Firestore database instance
import { db } from "../../Utility/firebase";
// Importing global data context for accessing state
import { DataContext } from "../../Components/DataProvider/DataProvider";
// Importing reusable product card component to display order items
import ProductCard from "../../Components/Product/ProductCard";
// Importing Firestore methods for querying and listening to data
import {
  collection,
  doc,
  query,
  orderBy,
  onSnapshot,
} from "firebase/firestore";

function Orders() {
  // Accessing user and global state from context
  const { state, dispatch } = useContext(DataContext);
  const user = state.user;

  // Local state to store fetched orders
  const [orders, setOrders] = useState([]);

  // useEffect to fetch and listen to user's order data from Firestore
  useEffect(() => {
    // If no user is logged in, clear the orders
    if (!user) {
      setOrders([]);
      return;
    }

    // Reference to the user's "orders" subcollection in Firestore
    const ordersRef = collection(
      doc(collection(db, "user"), user.uid), // Navigate to user's document
      "orders" // Access the "orders" subcollection
    );

    // Query to sort orders by creation date in descending order
    const q = query(ordersRef, orderBy("created", "desc"));

    // Subscribe to real-time updates from Firestore
    const unsubscribe = onSnapshot(q, (snapshot) => {
      console.log(snapshot);
      // Map snapshot data to an array of orders
      setOrders(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });

    // Cleanup listener when component unmounts or user changes
    return () => unsubscribe();
  }, [user]);

  return (
    // Wrap the page with common layout
    <LayOut>
      <section className={classes.container}>
        <div className={classes.orders__container}>
          <h2>Your Orders</h2>

          {/* Show message if no orders found */}
          {orders?.length == 0 && (
            <div style={{ color: "red", padding: "20px", fontWeight: "bold" }}>
              You have no orders yet!
            </div>
          )}

          {/* Display all orders */}
          <div className={classes.order_container}>
            {orders?.map((eachOrder, i) => (
              <div key={i}>
                <hr />
                {/* Display order ID */}
                <p>Order Id: {eachOrder?.id}</p>

                {/* Display all items in the order using ProductCard */}
                {eachOrder?.data?.basket?.map((order) => (
                  <ProductCard flex={true} product={order} key={order.id} />
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>
    </LayOut>
  );
}

// Exporting Orders component for use in the app
export default Orders;












































































// //
// import React, { useContext, useEffect, useState } from "react";
// import classes from "./Orders.module.css";
// import LayOut from "./../../Components/LayOut/LayOut";
// import { db } from "../../Utility/firebase";
// import { DataContext } from "../../Components/DataProvider/DataProvider";
// import ProductCard from "../../Components/Product/ProductCard";
// import {
//   collection,
//   doc,
//   query,
//   orderBy,
//   onSnapshot,
// } from "firebase/firestore";

// function Orders() {
//   const { state, dispatch } = useContext(DataContext);
//   const user = state.user;
//   const [orders, setOrders] = useState([]);

//   useEffect(() => {
//     if (!user) {
//       setOrders([]);
//       return;
//     }

//     const ordersRef = collection(
//       doc(collection(db, "user"), user.uid),
//       "orders"
//     );
//     const q = query(ordersRef, orderBy("created", "desc"));

//     const unsubscribe = onSnapshot(q, (snapshot) => {
//       console.log(snapshot);
//       setOrders(
//         snapshot.docs.map((doc) => ({
//           id: doc.id,
//           data: doc.data(),
//         }))
//       );
//     });

//     return () => unsubscribe(); // Cleanup listener on unmount
//   }, [user]);

//   return (
//     <LayOut>
//       <section className={classes.container}>
//         <div className={classes.orders__container}>
//           <h2>Your Orders</h2>
//           {orders?.length == 0 && (
//             <div style={{ color: "red", padding: "20px", fontWeight: "bold" }}>
//               You have no orders yet!
//             </div>
//           )}
//           <div className={classes.order_container}>
//             {orders?.map((eachOrder, i) => (
//               <div key={i}>
//                 <hr />
//                 <p>Order Id: {eachOrder?.id}</p>
//                 {eachOrder?.data?.basket?.map((order) => (
//                   <ProductCard flex={true} product={order} key={order.id} />
//                 ))}
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>
//     </LayOut>
//   );
// }

// export default Orders;
