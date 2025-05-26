// Importing React core to create functional components
import React from "react";

// Importing menu icon from react-icons library
import { AiOutlineMenu } from "react-icons/ai";

// Importing scoped CSS module for styling
import classes from "./Header.module.css";

// Functional component for the lower section of the header (navigation menu)
function LowerHeader() {
  return (
    // Container for the lower header navigation bar
    <div className={classes.lower_container}>
      <ul>
        {/* "All" category with a hamburger menu icon */}
        <li>
          <AiOutlineMenu />
          <p>All</p>
        </li>

        {/* Static navigation links */}
        <li>Today's Deals</li>
        <li>Customer Service</li>
        <li>Registry</li>
        <li>Gift Cards</li>
        <li>Sell</li>
      </ul>
    </div>
  );
}

// Exporting the LowerHeader component for use in other parts of the app
export default LowerHeader;





















































// import React from 'react'
// import { AiOutlineMenu } from "react-icons/ai";
// import classes from "./Header.module.css";

// function LowerHeader() {
//   return (
//     <div className={classes.lower_container}>
//       <ul>
//         <li>
//           <AiOutlineMenu />
//           <p>All</p>
//         </li>
//         <li>Today's Deals</li>
//         <li>Customer Service</li>
//         <li>Registry</li>
//         <li>Gift Cards</li>
//         <li>Sell</li>
//       </ul>
//     </div>
//   );
// }

// export default LowerHeader
