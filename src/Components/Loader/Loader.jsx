// Importing React to define the functional component
import React from "react";

// Importing the FadeLoader spinner component from react-spinners library
import { FadeLoader } from "react-spinners";

// Functional component to display a centered loading spinner
function Loader() {
  return (
    // Centering the loader using flexbox styles
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "50vh",
      }}
    >
      {/* FadeLoader is the loading animation shown while data is loading */}
      <FadeLoader color="#36d7b7" />
    </div>
  );
}

// Exporting the Loader component to use in other parts of the app (e.g., during API calls)
export default Loader;























// import React from 'react'
// import {FadeLoader} from "react-spinners";

// function Loader() {
//   return (
//     <div style={{display:"flex", justifyContent:"center", alignItems:"center", height:"50vh"}}>
//       <FadeLoader color='#36d7b7' />
//     </div>
//   );
// }

// export default Loader
