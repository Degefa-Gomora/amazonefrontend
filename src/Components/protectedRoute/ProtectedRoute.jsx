// import React ,{useContext,useEffect} from 'react'
// import { useNavigation } from 'react-router-dom'
// import { DataContext } from '../DataProvider/DataProvider'

// function ProtectedRoute({children,message,redirect}) {
//     const navigate = useNavigation()
//     const { state, dispatch } = useContext(DataContext);
//     const user = state.user;
//     useEffect(() => {
//         if(!user){
//             navigate("/auth", { state: { message, redirect } });
//         }
//     },[user])



//   return children;
// }

// export  {ProtectedRoute}

// Components/protectedRoute/ProtectedRoute.jsx
import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { DataContext } from '../DataProvider/DataProvider';

const ProtectedRoute = ({ children, message, redirect }) => {
  const navigate = useNavigate();
  const { state } = useContext(DataContext);
  const user = state.user;

  useEffect(() => {
    if (!user) {
      navigate("/auth", { state: { message, redirect } });
    }
  }, [user, navigate, message, redirect]);

  return user ? children : null; // Don't render children until user is available
};

export { ProtectedRoute };
