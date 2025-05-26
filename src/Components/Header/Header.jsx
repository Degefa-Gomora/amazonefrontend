
// Importing React core and necessary packages
import React from 'react';

// Importing icons for UI elements
import { CiLocationOn } from "react-icons/ci";
import { BsSearch } from "react-icons/bs";
import { BiCart } from "react-icons/bi";

// Importing modular CSS for scoped styling
import classes from "./Header.module.css";

// Importing LowerHeader component (secondary navigation bar)
import LowerHeader from './LowerHeader';

// Importing Link for client-side routing
import { Link } from 'react-router-dom';

// Importing useContext to access global state
import { useContext } from 'react';

// Importing global state context
import { DataContext } from '../DataProvider/DataProvider.jsx';

// Importing Firebase authentication module
import { auth } from "../../Utility/firebase.js";

function Header() {
  // Accessing global state and dispatch method from context
  const { state, dispatch } = useContext(DataContext);

  // Destructuring user and basket from global state
  const { user, basket } = state;

  // Calculating total number of items in the basket
  const totalItems = basket?.reduce((sum, item) => sum + item.amount, 0);

  return (
    // Main header wrapper with fixed position
    <section className={classes.fixed_header}>
      <section>
        {/* Top header container */}
        <div className={classes.header_container}>
          
          {/* Left side: Logo and delivery location */}
          <div className={classes.logo_container}>
            
            {/* Amazon logo with home link */}
            <Link to="/">
              <img
                src="https://pngimg.com/uploads/amazon/small/amazon_PNG11.png"
                alt="Amazon logo"
              />
            </Link>

            {/* Delivery location with location icon */}
            <div className={classes.delivery}>
              <span>
                <CiLocationOn />
              </span>
              <div>
                <p>Delivered to</p>
                <span>Ethiopia</span>
              </div>
            </div>
          </div>

          {/* Center: Search bar */}
          <div className={classes.search}>
            {/* Category dropdown */}
            <select name="" id="">
              <option value="All">All</option>
            </select>

            {/* Text input for search */}
            <input type="text" placeholder="Search products" />

            {/* Search icon */}
            <BsSearch size={25} />
          </div>

          {/* Right side: Language, Auth, Orders, and Cart */}
          <div className={classes.order_container}>
            
            {/* Language selector with flag */}
            <div className={`${classes.language} ${classes.combined_hover}`}>
              <img
                src="https://image.shutterstock.com/image-vector/usa-flag-icons-vector-set-260nw-2491312125.jpg"
                alt="USA Flag"
              />
              <select name="" id="">
                <option value="">EN</option>
              </select>
            </div>

            {/* Sign in/out block */}
            <Link to={!user && "/auth"}>
              <div>
                {user ? (
                  <>
                    {/* Greet logged-in user by name */}
                    <p>Hello {user.email?.split("@")[0]}</p>
                    {/* Sign out button */}
                    <span onClick={() => auth.signOut()}>SignOut</span>
                  </>
                ) : (
                  <>
                    {/* Sign in prompt for guests */}
                    <p> Sign In</p>
                    <span>Accounts and Lists</span>
                  </>
                )}
              </div>
            </Link>

            {/* Orders section */}
            <Link to="/orders" className={classes.orders}>
              <div>
                <p>Returns</p>
                <span>& Orders</span>
              </div>
            </Link>

            {/* Shopping cart with total item count */}
            <Link to={"/cart"} className={classes.cart}>
              <BiCart size={25} />
              <span>{totalItems}</span>
            </Link>
          </div>
        </div>

        {/* Lower header for additional navigation or links */}
        <LowerHeader />
      </section>
    </section>
  );
}

export default Header;





























// // Importing icons for UI elements
// import { CiLocationOn } from "react-icons/ci";
// import { BsSearch } from "react-icons/bs";
// import { BiCart } from "react-icons/bi";
// // Importing modular CSS for scoped styling
// import classes from "./Header.module.css";
// // Importing LowerHeader component (secondary navigation bar)
// import LowerHeader from "./LowerHeader";
// // Importing Link for client-side routing
// import { Link } from "react-router-dom";
// // Importing useContext to access global state
// import { useContext } from "react";
// // Importing global state context
// import { DataContext } from "../DataProvider/DataProvider.jsx";
// // Importing Firebase authentication module
// import { auth } from "../../Utility/firebase.js";

// function Header() {
//   // utilize the DataContext to access user and basket state(from the global state)
//   const { state } = useContext(DataContext);
//   const { user, basket } = state;
//   const totalItems = basket?.reduce((sum, item) => sum + item.amount, 0);

//   return (
//     <section className={classes.fixed_header}>
//       <section>
//         <div className={classes.header_container}>
//           <div className={classes.logo_container}>
//             {/* logo */}
//             <Link to="/">
//               <img
//                 src="https://pngimg.com/uploads/amazon/small/amazon_PNG11.png"
//                 alt="Amazon logo"
//               />
//             </Link>
//             {/* Delivery */}
//             <div className={classes.delivery}>
//               <span>
//                 <CiLocationOn />
//               </span>
//               <div>
//                 <p>Delivered to</p>
//                 <span>Ethiopia</span>
//               </div>
//             </div>
//           </div>
//           <div className={classes.search}>
//             {/* search */}
//             <select name="" id="">
//               <option value="All">All</option>
//             </select>
//             <input type="text" name="" id="" placeholder="Search products" />
//             <BsSearch size={25} />
//             {/* icon */}
//           </div>
//           {/* Right side link */}
//           <div className={classes.order_container}>
//             <div className={`${classes.language} ${classes.combined_hover}`}>
//               <img
//                 src="https://image.shutterstock.com/image-vector/usa-flag-icons-vector-set-260nw-2491312125.jpg"
//                 alt=""
//               />
//               <select name="" id="">
//                 <option value="">EN</option>
//               </select>
//             </div>
//             {/* Sign-in / Sign-out: using firebase auth */}
//             <Link to={!user && "/auth"}>
//               <div>
//                 {user ? (
//                   <>
//                     <p>Hello {user.email?.split("@")[0]}</p>
//                     <span onClick={() => auth.signOut()}>SignOut</span>
//                   </>
//                 ) : (
//                   <>
//                     <p> Sign In</p>
//                     <span>Accounts and Lists</span>
//                   </>
//                 )}
//               </div>
//             </Link>
//             {/* orders */}
//             <Link to="/orders" className={classes.orders}>
//               <div>
//                 <p>returns</p>
//                 <span>& Orders</span>
//               </div>
//             </Link>
//             {/* Carts */}
//             <Link to={"/cart"} className={classes.cart}>
//               <BiCart size={25} />
//               <span>{totalItems}</span>
//             </Link>
//           </div>
//         </div>
//         <LowerHeader />
//       </section>
//     </section>
//   );
// }

// export default Header;
