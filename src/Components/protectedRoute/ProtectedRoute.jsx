import React, { useContext, useEffect } from "react";
// useNavigate for programmatic navigation in React Router
import { useNavigate } from "react-router-dom";
// Import global state context to check user authentication status
import { DataContext } from "../DataProvider/DataProvider";

const ProtectedRoute = ({ children, message, redirect }) => {
  // Initialize navigate function for redirecting users
  const navigate = useNavigate();
  // Get global state from context
  const { state } = useContext(DataContext);
  // Extract current authenticated user from state
  const user = state.user;

  // Effect runs on mount and whenever user or dependencies change
  useEffect(() => {
    // If no authenticated user, redirect to /auth with optional message and redirect path
    if (!user) {
      navigate("/auth", { state: { message, redirect } });
    }
  }, [user, navigate, message, redirect]);

  // Render children only if user is authenticated; otherwise render nothing (null)
  return user ? children : null;
};

export { ProtectedRoute };











































































































































// import React, { useContext, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { DataContext } from '../DataProvider/DataProvider';

// const ProtectedRoute = ({ children, message, redirect }) => {
//   const navigate = useNavigate();
//   const { state } = useContext(DataContext);
//   const user = state.user;

//   useEffect(() => {
//     if (!user) {
//       navigate("/auth", { state: { message, redirect } });
//     }
//   }, [user, navigate, message, redirect]);

//   return user ? children : null; // Don't render children until user is available
// };

// export { ProtectedRoute };
