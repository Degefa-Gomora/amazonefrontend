// import { useContext, useEffect, useState } from 'react'
// import Routing from './Routing.jsx'
// import { DataContext } from './Components/DataProvider/DataProvider.jsx'
// import { Type } from './Utility/action.type.js'
// import { auth } from './Utility/firebase.js'

// function App() {
//   const [count, setCount] = useState(0)
//   const {user,dispatch} = useContext(DataContext)
//   useEffect(() => {
//     auth.onAuthStateChanged((authUser)=>{
//       if(authUser){
//         dispatch({
//           type:Type.SET_USER,
//           user:authUser

//         })
//       }else{
//         dispatch({
//           type: Type.SET_USER,
//           user: null,
//         });
//       }
//     })
//   },[])

//   return (
//     <>
//       <Routing />
      
//     </>
//   )
// }

// export default App



import { useContext, useEffect, useState } from "react";
import Routing from "./Routing.jsx";
import { DataContext } from "./Components/DataProvider/DataProvider.jsx";
import { Type } from "./Utility/action.type.js";
import { auth } from "./Utility/firebase.js";

function App() {
  const [count, setCount] = useState(0); // Example local state (currently unused)

  // Extract user and dispatch function from global DataContext
  const { user, dispatch } = useContext(DataContext);

  useEffect(() => {
    // Subscribe to Firebase auth state changes on component mount
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        // If user is logged in, update global state with user data
        dispatch({
          type: Type.SET_USER,
          user: authUser,
        });
      } else {
        // If no user is logged in, set user state to null
        dispatch({
          type: Type.SET_USER,
          user: null,
        });
      }
    });
  }, [dispatch]); // Only run once on mount, dispatch is stable reference

  return (
    <>
      {/* Render the Routing component which handles all app routes */}
      <Routing />
    </>
  );
}

export default App;
