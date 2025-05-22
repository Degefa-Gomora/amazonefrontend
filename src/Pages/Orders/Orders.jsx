// import React,{useContext,useEffect,useState} from 'react'
// import classes from './Orders.module.css'
// import LayOut from './../../Components/LayOut/LayOut'
// import { db } from '../../Utility/firebase'
// import { DataContext } from '../../Components/DataProvider/DataProvider'
// import ProductCard from '../../Components/Product/ProductCard'


// function Orders() {
//   const { state , dispatch} = useContext(DataContext);
//   const user = state.user;
//   const [orders,setOrders] = useState([])
//   useEffect(()=>{
//     if (user) {
//       db.collection("users")
//         .doc(user.uid)
//         .collection("orders")
//         .orderBy("created", "desc")
//         .onSnapshot((snapshot) => {
//           console.log(snapshot);
//           setOrders(
//             snapshot.docs.map((doc) => ({
//               id: doc.id,
//               data: doc.data(),
//             }))
//           );
//         });

//     } else {
//       setOrders([])
//     }
//   },[])
//   return (
//     <LayOut>
//       <section className={classes.container}>
//         <div className={classes.order_container}>
//           <h2>Your Orders</h2>
//           {/* ordered items */}
//           <div>
//            {
//             orders?.map((eachorder,i)=>{
//               return (
//                 <div key={i}>
//                   <hr/>
//                   <p>Order Id:{eachorder?.id}</p>
//                   {
//                     eachorder?.data?.basket?.map(order =>{
//                       <ProductCard
//                       flex={true}
//                       product={order}
//                       key={order.id}
//                       />
//                     })
//                   }
//                 </div>
//               )
//             })
//            } 
//           </div>
//         </div>
//       </section>
//       </LayOut>
//   )
// }

// export default Orders





import React, { useContext, useEffect, useState } from "react";
import classes from "./Orders.module.css";
import LayOut from "./../../Components/LayOut/LayOut";
import { db } from "../../Utility/firebase";
import { DataContext } from "../../Components/DataProvider/DataProvider";
import ProductCard from "../../Components/Product/ProductCard";
import {
  collection,
  doc,
  query,
  orderBy,
  onSnapshot,
} from "firebase/firestore";

function Orders() {
  const { state, dispatch } = useContext(DataContext);
  const user = state.user;
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (!user) {
      setOrders([]);
      return;
    }

    const ordersRef = collection(
      doc(collection(db, "user"), user.uid),
      "orders"
    );
    const q = query(ordersRef, orderBy("created", "desc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      console.log(snapshot);
      setOrders(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });

    return () => unsubscribe(); // Cleanup listener on unmount
  }, [user]);

  return (
    <LayOut>
      <section className={classes.container}>
        <div className={classes.orders__container}>
          <h2>Your Orders</h2>
          {orders?.length == 0 && (
            <div style={{ color: "red", padding: "20px", fontWeight: "bold" }}>
              You have no orders yet!
            </div>
          )}
          <div className={classes.order_container}>
            {orders?.map((eachOrder, i) => (
              <div key={i}>
                <hr />
                <p>Order Id: {eachOrder?.id}</p>
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

export default Orders;
