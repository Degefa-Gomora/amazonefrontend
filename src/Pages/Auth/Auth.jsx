// Importing core React and hooks
import React, { useState, useContext } from "react";

// Importing CSS module
import classes from "./SignUp.module.css";

// React Router utilities
import { Link, useNavigate, useLocation } from "react-router-dom";

// Firebase Auth
import { auth } from "../../Utility/firebase";

// Spinner
import { ClipLoader } from "react-spinners";

// Firebase methods
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

// Global Context
import { DataContext } from "../../Components/DataProvider/DataProvider";

// Password visibility icons
import { FaEye, FaEyeSlash } from "react-icons/fa";

function Auth() {
  const [name, setName] = useState(""); // New state for name
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState({ signIn: false, signUp: false });
  const [isSignIn, setIsSignIn] = useState(true); // true = Sign In, false = Sign Up

  const { dispatch } = useContext(DataContext);
  const navigate = useNavigate();
  const navStateData = useLocation();

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const authHandler = async (e) => {
    e.preventDefault();
    const action = isSignIn ? "signIn" : "signUp";

    setLoading((prev) => ({ ...prev, [action]: true }));

    try {
      let userCredential;

      if (isSignIn) {
        userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
      } else {
        userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

        // Set display name after sign up
        await updateProfile(userCredential.user, {
          displayName: name,
        });
      }

      dispatch({ type: "SET_USER", user: userCredential.user });
      setError("");
      navigate(navStateData?.state?.redirect || "/");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading((prev) => ({ ...prev, [action]: false }));
    }
  };

  return (
    <section className={classes.login}>
      <Link to="/">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png"
          alt="Amazon logo"
        />
      </Link>

      <div className={classes.login_Container}>
        <h1>{isSignIn ? "Sign In" : "Create Account"}</h1>

        {navStateData?.state?.message && (
          <small style={{ color: "red", fontWeight: "bold" }}>
            {navStateData?.state?.message}
          </small>
        )}

        <form onSubmit={authHandler}>
          {/* Name - Show only during Sign Up */}
          {!isSignIn && (
            <div>
              <label htmlFor="name">Name</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                id="name"
                required={!isSignIn}
              />
            </div>
          )}

          {/* Email */}
          <div>
            <label htmlFor="email">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              id="email"
              required
            />
          </div>

          {/* Password */}
          <div style={{ position: "relative" }}>
            <label htmlFor="password">Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type={showPassword ? "text" : "password"}
              id="password"
              required
            />
            <span
              onClick={togglePasswordVisibility}
              style={{
                position: "absolute",
                right: "10px",
                top: "35px",
                cursor: "pointer",
              }}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className={classes.logInButton}
            disabled={isSignIn ? loading.signIn : loading.signUp}
          >
            {isSignIn ? (
              loading.signIn ? (
                <ClipLoader color="black" size={20} />
              ) : (
                "Sign In"
              )
            ) : loading.signUp ? (
              <ClipLoader color="red" size={20} />
            ) : (
              "Create Account"
            )}
          </button>
        </form>

        <p>
          By {isSignIn ? "signing in" : "creating an account"}, you agree to the
          AMAZON FAKE CLONE Conditions of Use & Sale.
        </p>

        {/* Toggle Between Sign In / Sign Up */}
        <p style={{ marginTop: "10px" }}>
          {isSignIn ? "Don't have an account?" : "Already have an account?"}{" "}
          <button
            onClick={() => setIsSignIn(!isSignIn)}
            style={{
              color: "blue",
              background: "none",
              border: "none",
              cursor: "pointer",
              textDecoration: "underline",
              fontSize: "1rem",
            }}
          >
            {isSignIn ? "Create one" : "Sign In"}
          </button>
        </p>

        {error && <small className={classes.error}>{error}</small>}
      </div>
    </section>
  );
}

export default Auth;

//#############################################################################################################################

// // Importing core React and hooks
// import React, { useState, useContext } from "react";

// // Importing CSS module
// import classes from "./SignUp.module.css";

// // React Router utilities
// import { Link, useNavigate, useLocation } from "react-router-dom";

// // Firebase Auth
// import { auth } from "../../Utility/firebase";

// // Spinner
// import { ClipLoader } from "react-spinners";

// // Firebase methods
// import {
//   signInWithEmailAndPassword,
//   createUserWithEmailAndPassword,
// } from "firebase/auth";

// // Global Context
// import { DataContext } from "../../Components/DataProvider/DataProvider";

// // Password visibility icons
// import { FaEye, FaEyeSlash } from "react-icons/fa";

// function Auth() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState({ signIn: false, signUp: false });

//   const { dispatch } = useContext(DataContext);
//   const navigate = useNavigate();
//   const navStateData = useLocation();

//   const togglePasswordVisibility = () => {
//     setShowPassword((prev) => !prev);
//   };

//   const authHandler = async (e) => {
//     e.preventDefault();
//     const { name } = e.target;

//     if (name === "signin") {
//       setLoading((prev) => ({ ...prev, signIn: true }));
//       try {
//         const userCredential = await signInWithEmailAndPassword(
//           auth,
//           email,
//           password
//         );
//         dispatch({ type: "SET_USER", user: userCredential.user });
//         setError("");
//         navigate(navStateData?.state?.redirect || "/");
//       } catch (error) {
//         setError(error.message);
//       } finally {
//         setLoading((prev) => ({ ...prev, signIn: false }));
//       }
//     } else if (name === "signup") {
//       setLoading((prev) => ({ ...prev, signUp: true }));
//       try {
//         const userCredential = await createUserWithEmailAndPassword(
//           auth,
//           email,
//           password
//         );
//         dispatch({ type: "SET_USER", user: userCredential.user });
//         setError("");
//         navigate(navStateData?.state?.redirect || "/");
//       } catch (error) {
//         setError(error.message);
//       } finally {
//         setLoading((prev) => ({ ...prev, signUp: false }));
//       }
//     }
//   };

//   return (
//     <section className={classes.login}>
//       <Link to="/">
//         <img
//           src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png"
//           alt="Amazon logo"
//         />
//       </Link>

//       <div className={classes.login_Container}>
//         <h1>Sign In</h1>

//         {navStateData?.state?.message && (
//           <small
//             style={{
//               padding: "5px",
//               textAlign: "center",
//               color: "red",
//               fontWeight: "bold",
//             }}
//           >
//             {navStateData?.state?.message}
//           </small>
//         )}

//         <form onSubmit={(e) => e.preventDefault()}>
//           {/* Email */}
//           <div>
//             <label htmlFor="email">Email</label>
//             <input
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               type="email"
//               id="email"
//               required
//             />
//           </div>

//           {/* Password */}
//           <div style={{ position: "relative" }}>
//             <label htmlFor="password">Password</label>
//             <input
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               type={showPassword ? "text" : "password"}
//               id="password"
//               required
//             />
//             <span
//               onClick={togglePasswordVisibility}
//               style={{
//                 position: "absolute",
//                 right: "10px",
//                 top: "35px",
//                 cursor: "pointer",
//               }}
//             >
//               {showPassword ? <FaEyeSlash /> : <FaEye />}
//             </span>
//           </div>

//           {/* Sign In Button */}
//           <button
//             type="submit"
//             name="signin"
//             onClick={authHandler}
//             className={classes.logInButton}
//             disabled={loading.signIn}
//           >
//             {loading.signIn ? (
//               <ClipLoader color="black" size={20} />
//             ) : (
//               "Sign In"
//             )}
//           </button>
//         </form>

//         <p>
//           By signing in you agree to the AMAZON FAKE CLONE Conditions of Use &
//           Sale.
//         </p>

//         {/* Sign Up Button */}
//         <button
//           type="button"
//           name="signup"
//           onClick={authHandler}
//           className={classes.login_register}
//           disabled={loading.signUp}
//         >
//           {loading.signUp ? (
//             <ClipLoader color="red" size={20} />
//           ) : (
//             "Create your Amazon Account"
//           )}
//         </button>

//         {error && <small className={classes.error}>{error}</small>}
//       </div>
//     </section>
//   );
// }

// export default Auth;

//***********************************************************

// // Importing core React and hooks
// import React, { useState, useContext } from "react";

// // Importing CSS module
// import classes from "./SignUp.module.css";

// // React Router utilities
// import { Link, useNavigate, useLocation } from "react-router-dom";

// // Firebase Auth
// import { auth } from "../../Utility/firebase";

// // Spinner
// import { ClipLoader } from "react-spinners";

// // Firebase methods
// import {
//   signInWithEmailAndPassword,
//   createUserWithEmailAndPassword,
// } from "firebase/auth";

// // Global Context
// import { DataContext } from "../../Components/DataProvider/DataProvider";

// // Password visibility icons
// import { FaEye, FaEyeSlash } from "react-icons/fa";

// function Auth() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState({ signIn: false, signUp: false });
//   const [isSignIn, setIsSignIn] = useState(true); // true = Sign In, false = Sign Up

//   const { dispatch } = useContext(DataContext);
//   const navigate = useNavigate();
//   const navStateData = useLocation();

//   const togglePasswordVisibility = () => {
//     setShowPassword((prev) => !prev);
//   };

//   const authHandler = async (e) => {
//     e.preventDefault();
//     const action = isSignIn ? "signin" : "signup";

//     setLoading((prev) => ({ ...prev, [action]: true }));

//     try {
//       let userCredential;
//       if (isSignIn) {
//         userCredential = await signInWithEmailAndPassword(auth, email, password);
//       } else {
//         userCredential = await createUserWithEmailAndPassword(auth, email, password);
//       }

//       dispatch({ type: "SET_USER", user: userCredential.user });
//       setError("");
//       navigate(navStateData?.state?.redirect || "/");
//     } catch (error) {
//       setError(error.message);
//     } finally {
//       setLoading((prev) => ({ ...prev, [action]: false }));
//     }
//   };

//   return (
//     <section className={classes.login}>
//       <Link to="/">
//         <img
//           src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png"
//           alt="Amazon logo"
//         />
//       </Link>

//       <div className={classes.login_Container}>
//         <h1>{isSignIn ? "Sign In" : "Create Account"}</h1>

//         {navStateData?.state?.message && (
//           <small style={{ color: "red", fontWeight: "bold" }}>
//             {navStateData?.state?.message}
//           </small>
//         )}

//         <form onSubmit={authHandler}>
//           {/* Email */}
//           <div>
//             <label htmlFor="email">Email</label>
//             <input
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               type="email"
//               id="email"
//               required
//             />
//           </div>

//           {/* Password */}
//           <div style={{ position: "relative" }}>
//             <label htmlFor="password">Password</label>
//             <input
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               type={showPassword ? "text" : "password"}
//               id="password"
//               required
//             />
//             <span
//               onClick={togglePasswordVisibility}
//               style={{
//                 position: "absolute",
//                 right: "10px",
//                 top: "35px",
//                 cursor: "pointer",
//               }}
//             >
//               {showPassword ? <FaEyeSlash /> : <FaEye />}
//             </span>
//           </div>

//           {/* Submit Button */}
//           <button
//             type="submit"
//             className={classes.logInButton}
//             disabled={isSignIn ? loading.signIn : loading.signUp}
//           >
//             {isSignIn ? (
//               loading.signIn ? <ClipLoader color="black" size={20} /> : "Sign In"
//             ) : (
//               loading.signUp ? <ClipLoader color="red" size={20} /> : "Create Account"
//             )}
//           </button>
//         </form>

//         <p>
//           By {isSignIn ? "signing in" : "creating an account"}, you agree to the
//           AMAZON FAKE CLONE Conditions of Use & Sale.
//         </p>

//         {/* Toggle Between Sign In / Sign Up */}
//         <p style={{ marginTop: "10px" }}>
//           {isSignIn ? "Don't have an account?" : "Already have an account?"}{" "}
//           <button
//             onClick={() => setIsSignIn(!isSignIn)}
//             style={{
//               color: "blue",
//               background: "none",
//               border: "none",
//               cursor: "pointer",
//               textDecoration: "underline",
//               fontSize: "1rem",
//             }}
//           >
//             {isSignIn ? "Create one" : "Sign In"}
//           </button>
//         </p>

//         {error && <small className={classes.error}>{error}</small>}
//       </div>
//     </section>
//   );
// }

// export default Auth;

// // Importing React core and hooks
// import React, { useState, useContext } from "react";

// // Importing scoped CSS module styles for the SignUp component
// import classes from "./SignUp.module.css";

// // Importing routing utilities from react-router-dom
// import { Link, useNavigate, useLocation } from "react-router-dom";

// // Importing Firebase authentication instance
// import { auth } from "../../Utility/firebase";

// // Importing a spinner component for showing loading indicators
// import { ClipLoader } from "react-spinners";

// // Importing Firebase authentication methods for login and registration
// import {
//   signInWithEmailAndPassword,
//   createUserWithEmailAndPassword,
// } from "firebase/auth";

// // Importing global context for accessing and updating user state
// import { DataContext } from "../../Components/DataProvider/DataProvider";

// function Auth() {
//   // State for managing email input
//   const [email, setEmail] = useState("");

//   // State for managing password input
//   const [password, setPassword] = useState("");

//   // State for handling error messages
//   const [error, setError] = useState("");

//   // State for controlling loading indicators for SignIn and SignUp
//   const [loading, setLoading] = useState({ signIn: false, signUp: false });

//   // Accessing global state dispatcher from DataContext
//   const { dispatch } = useContext(DataContext);

//   // Hook for navigating programmatically
//   const navigate = useNavigate();

//   // Hook for accessing route state (e.g., redirect path or message)
//   const navStateData = useLocation();

//   // Logging location state data for debugging
//   console.log(navStateData);

//   // Function to handle both SignIn and SignUp actions
//   const authHandler = async (e) => {
//     e.preventDefault(); // Prevent form default submission
//     const { name } = e.target; // Get the name of the button clicked

//     // Handle Sign In
//     if (name === "signin") {
//       setLoading((prev) => ({ ...prev, signIn: true })); // Show Sign In loader
//       try {
//         const userCredential = await signInWithEmailAndPassword(
//           auth,
//           email,
//           password
//         ); // Sign in using Firebase
//         dispatch({ type: "SET_USER", user: userCredential.user }); // Update user in global state
//         setError(""); // Clear error messages
//         navigate(navStateData?.state?.redirect || "/"); // Navigate to redirected page or home
//       } catch (error) {
//         setError(error.message); // Display error if sign in fails
//       } finally {
//         setLoading((prev) => ({ ...prev, signIn: false })); // Hide Sign In loader
//       }
//     }

//     // Handle Sign Up
//     else if (name === "signup") {
//       setLoading((prev) => ({ ...prev, signUp: true })); // Show Sign Up loader
//       try {
//         const userCredential = await createUserWithEmailAndPassword(
//           auth,
//           email,
//           password
//         ); // Register user using Firebase
//         dispatch({ type: "SET_USER", user: userCredential.user }); // Update user in global state
//         setError(""); // Clear error messages
//         navigate(navStateData?.state?.redirect || "/"); // Navigate to redirected page or home
//       } catch (error) {
//         setError(error.message); // Display error if sign up fails
//       } finally {
//         setLoading((prev) => ({ ...prev, signUp: false })); // Hide Sign Up loader
//       }
//     }
//   };

//   return (
//     // Main login section with styling
//     <section className={classes.login}>
//       {/* Logo image linking to homepage */}
//       <Link to="/">
//         <img
//           src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png"
//           alt="Amazon logo"
//         />
//       </Link>

//       {/* Login form container */}
//       <div className={classes.login_Container}>
//         <h1>Sign In</h1>

//         {/* Display optional route message if available */}
//         {navStateData?.state?.message && (
//           <small
//             style={{
//               padding: "5px",
//               textAlign: "center",
//               color: "red",
//               fontWeight: "bold",
//             }}
//           >
//             {navStateData?.state?.message}
//           </small>
//         )}

//         {/* Form with Sign In functionality */}
//         <form onSubmit={(e) => e.preventDefault()}>
//           {/* Email field */}
//           <div>
//             <label htmlFor="email">Email</label>
//             <input
//               value={email}
//               onChange={(e) => setEmail(e.target.value)} // Update email state
//               type="email"
//               id="email"
//               required
//             />
//           </div>

//           {/* Password field */}
//           <div>
//             <label htmlFor="password">Password</label>
//             <input
//               value={password}
//               onChange={(e) => setPassword(e.target.value)} // Update password state
//               type="password"
//               id="password"
//               required
//             />
//           </div>

//           {/* Sign In button with loader */}
//           <button
//             type="submit"
//             name="signin"
//             onClick={authHandler} // Handle Sign In click
//             className={classes.logInButton}
//             disabled={loading.signIn} // Disable while loading
//           >
//             {loading.signIn ? (
//               <ClipLoader color="black" size={20} /> // Show loader
//             ) : (
//               "Sign In" // Show text
//             )}
//           </button>
//         </form>

//         {/* Disclaimer message */}
//         <p>
//           By signing in you agree to the AMAZON FAKE CLONE Conditions of Use &
//           Sale.
//         </p>

//         {/* Sign Up button with loader */}
//         <button
//           type="button"
//           name="signup"
//           onClick={authHandler} // Handle Sign Up click
//           className={classes.login_register}
//           disabled={loading.signUp} // Disable while loading
//         >
//           {loading.signUp ? (
//             <ClipLoader color="red" size={20} /> // Show loader
//           ) : (
//             "Create your Amazon Account" // Show text
//           )}
//         </button>

//         {/* Display error message if any */}
//         {error && <small className={classes.error}>{error}</small>}
//       </div>
//     </section>
//   );
// }

// // Exporting the Auth component for use in other parts of the app
// export default Auth;

// // import React, { useState, useContext } from "react";
// // import classes from "./SignUp.module.css";
// // import { Link, useNavigate,useLocation } from "react-router-dom";
// // import { auth } from "../../Utility/firebase";
// // import { ClipLoader } from "react-spinners";
// // import {
// //   signInWithEmailAndPassword,
// //   createUserWithEmailAndPassword,
// // } from "firebase/auth";
// // import { DataContext } from "../../Components/DataProvider/DataProvider";

// // function Auth() {
// //   const [email, setEmail] = useState("");
// //   const [password, setPassword] = useState("");
// //   const [error, setError] = useState("");
// //   const [loading, setLoading] = useState({ signIn: false, signUp: false });

// //   const { dispatch } = useContext(DataContext);
// //   const navigate = useNavigate();
// //   const navStateData = useLocation()
// //   console.log(navStateData)

// //   const authHandler = async (e) => {
// //     e.preventDefault();
// //     const { name } = e.target;

// //     if (name === "signin") {
// //       setLoading((prev) => ({ ...prev, signIn: true }));
// //       try {
// //         const userCredential = await signInWithEmailAndPassword(
// //           auth,
// //           email,
// //           password
// //         );
// //         dispatch({ type: "SET_USER", user: userCredential.user });
// //         setError("");
// //         navigate(navStateData?.state?.redirect || "/");
// //       } catch (error) {
// //         setError(error.message);
// //       } finally {
// //         setLoading((prev) => ({ ...prev, signIn: false }));
// //       }
// //     } else if (name === "signup") {
// //       setLoading((prev) => ({ ...prev, signUp: true }));
// //       try {
// //         const userCredential = await createUserWithEmailAndPassword(
// //           auth,
// //           email,
// //           password
// //         );
// //         dispatch({ type: "SET_USER", user: userCredential.user });
// //         setError("");
// //         navigate(navStateData?.state?.redirect || "/");
// //       } catch (error) {
// //         setError(error.message);
// //       } finally {
// //         setLoading((prev) => ({ ...prev, signUp: false }));
// //       }
// //     }
// //   };

// //   return (
// //     <section className={classes.login}>
// //       <Link to="/">
// //         <img
// //           src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png"
// //           alt="Amazon logo"
// //         />
// //       </Link>

// //       <div className={classes.login_Container}>
// //         <h1>Sign In</h1>
// //         {navStateData?.state?.message && (
// //           <small
// //             style={{
// //               padding: "5px",
// //               textAlign: "center",
// //               color: "red",
// //               fontWeight: "bold",
// //             }}
// //           >
// //             {navStateData?.state?.message}
// //           </small>
// //         )}

// //         <form onSubmit={(e) => e.preventDefault()}>
// //           <div>
// //             <label htmlFor="email">Email</label>
// //             <input
// //               value={email}
// //               onChange={(e) => setEmail(e.target.value)}
// //               type="email"
// //               id="email"
// //               required
// //             />
// //           </div>
// //           <div>
// //             <label htmlFor="password">Password</label>
// //             <input
// //               value={password}
// //               onChange={(e) => setPassword(e.target.value)}
// //               type="password"
// //               id="password"
// //               required
// //             />
// //           </div>
// //           <button
// //             type="submit"
// //             name="signin"
// //             onClick={authHandler}
// //             className={classes.logInButton}
// //             disabled={loading.signIn}
// //           >
// //             {loading.signIn ? (
// //               <ClipLoader color="black" size={20} />
// //             ) : (
// //               "Sign In"
// //             )}
// //           </button>
// //         </form>

// //         <p>
// //           By signing in you agree to the AMAZON FAKE CLONE Conditions of Use &
// //           Sale.
// //         </p>

// //         <button
// //           type="button"
// //           name="signup"
// //           onClick={authHandler}
// //           className={classes.login_register}
// //           disabled={loading.signUp}
// //         >
// //           {loading.signUp ? (
// //             <ClipLoader color="red" size={20} />
// //           ) : (
// //             "Create your Amazon Account"
// //           )}
// //         </button>

// //         {error && <small className={classes.error}>{error}</small>}
// //       </div>
// //     </section>
// //   );
// // }

// // export default Auth;
