
// import React from "react";
// import classes from "./SignUp.module.css";
// import { Link } from "react-router-dom";
// import { useState } from "react";
// import {auth} from "../../Utility/firebase"
// import {ClipLoader} from "react-spinners";
// // import  {auth}  from "firebase/auth";
// import { signInWithEmailAndPassword,createUserWithEmailAndPassword } from "firebase/auth";
// import { useContext } from "react";
// import { DataContext, DataProvider } from "../../Components/DataProvider/DataProvider";



// function Auth() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   // const {user,dispatch} = useContext(DataContext);
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState({
//     signIn: false,
//     signUp: false,
//   });
  

//   // console.log( email, password);
//   const authHandler = (e) => {
//     e.preventDefault();
//     // console.log(e.target.value);
//     if (e.target.name === "signin") {
//       // firebase authentication
//       setLoading({ ...loading, signIn: true });
//       signInWithEmailAndPassword(auth, email, password)
//         .then((userCredential) => {
//           // dispatch({
//           //   type: "SET_USER",
//           //   user: userCredential.user,
//           // });
//           // Signed in
//           const user = userCredential.user;
//           console.log(user);
//         })
//         setLoading({ ...loading, signIn: false })
//         .catch((error) => {
//           const errorCode = error.code;
//           const errorMessage = error.message;
//           setError(errorMessage);
//           setLoading({ ...loading, signIn: false })
//         });
//     }else{
//       // firebase authentication
//       setLoading({ ...loading, signUp: true });
//       createUserWithEmailAndPassword(auth, email, password)
//         .then((userCredential) => {
//           // dispatch({
//           //   type: "SET_USER",
//           //   user: userCredential.user,
//           // });
//           // // Signed in
//           const user = userCredential.user;
//           console.log(user);
//           // ...
//         })
//         setLoading({ ...loading, signUp: false })
//         .catch((error) => {
//           const errorCode = error.code;
//           const errorMessage = error.message;
//           setError(errorMessage);
//           setLoading({ ...loading, signIn: false })
//         });
//     }
//   }

//   return (
//     <section className={classes.login}>
//       {/* logo */}
//       <Link>
//         <img
//           src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png"
//           alt=""
//         />
//       </Link>

//       {/* form */}
//       <div className={classes.login_Container}>
//         <h1>Sign In</h1>
//         <form action="">
//           <div>
//             <label htmlFor="email">Email</label>
//             <input value={email} onChange = {(e)=> setEmail(e.target.value)} type="email" id="email" />
//           </div>
//           <div>
//             <label htmlFor="password">Password</label>
//             <input value={password} onChange={(e)=> setPassword(e.target.value)} type="password" id="password" />
//           </div>
//           <button type="submit" name="signin" onClick={authHandler} className={classes.logInButton}>Sign In</button>
//           {
//             loading.signIn ? (
//               <ClipLoader
//                 color="#000000"
//                 loading={loading.signIn}
//                 size={30}
//               />
//             ) : (
//               <Link to="/signup" className={classes.register}>
//                 Create your Amazon Account
//               </Link>
//             )
//           }
//         </form>
//         <p>
//           By signing-in you agree to the AMAZON FAKE CLONE Conditions of Use &
//           Sale. Please see our Privacy Notice, our Cookies Notice and our
//           Interest-Based Ads Notice.
//         </p>
//         <button type="submit" name="signup" onClick={authHandler} className={classes.login_register}>Create your Amazone Account</button>
//         {error && <small className={classes.error}>{error}</small>}
//       </div>
//     </section>
//   )};

// export default Auth;


// import React, { useState, useContext } from "react";
// import classes from "./SignUp.module.css";
// import { Link,useNavigate } from "react-router-dom";
// import { auth } from "../../Utility/firebase";
// import { ClipLoader } from "react-spinners";
// // import { DataContext } from "../../Components/DataProvider/DataProvider";
// import {
//   signInWithEmailAndPassword,
//   createUserWithEmailAndPassword,
// } from "firebase/auth";

// function Auth() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState({
//     signIn: false,
//     signUp: false,
//   });

//   // const { user, dispatch } = useContext(DataContext);
//   const navigate = useNavigate();

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
//         console.log("Signed in user:", userCredential.user);
//         // dispatch({ type: "SET_USER", user: userCredential.user });
//         setError("");
//       } catch (error) {
//         setError(error.message);
//       } finally {
//         setLoading((prev) => ({ ...prev, signIn: false }));
//          navigate("/"); // Redirect to home page after successful sign-in
//       }
//     } else if (name === "signup") {
//       setLoading((prev) => ({ ...prev, signUp: true }));
//       try {
//         const userCredential = await createUserWithEmailAndPassword(
//           auth,
//           email,
//           password
//         );
//         console.log("Signed up user:", userCredential.user);
//         // dispatch({ type: "SET_USER", user: userCredential.user });
//         setError("");
//       } catch (error) {
//         setError(error.message);
//       } finally {
//         setLoading((prev) => ({ ...prev, signUp: false }));
//         navigate("/"); // Redirect to home page 
//       }
//     }
//   };

//   return (
//     <section className={classes.login}>
//       {/* logo */}
//       <Link to="/">
//         <img
//           src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png"
//           alt="Amazon logo"
//         />
//       </Link>

//       {/* form */}
//       <div className={classes.login_Container}>
//         <h1>Sign In</h1>
//         <form onSubmit={(e) => e.preventDefault()}>
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
//           <div>
//             <label htmlFor="password">Password</label>
//             <input
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               type="password"
//               id="password"
//               required
//             />
//           </div>
//           <button
//             type="submit"
//             name="signin"
//             onClick={authHandler}
//             className={classes.logInButton}
//             disabled={loading.signIn}
//           >
//             {loading.signIn ? (
//               <ClipLoader color="black" loading={true} size={20} />
//             ) : (
//               "Sign In"
//             )}
//           </button>
//         </form>

//         <p>
//           By signing-in you agree to the AMAZON FAKE CLONE Conditions of Use &
//           Sale. Please see our Privacy Notice, our Cookies Notice and our
//           Interest-Based Ads Notice.
//         </p>

//         <button
//           type="button"
//           name="signup"
//           onClick={authHandler}
//           className={classes.login_register}
//           disabled={loading.signUp}
//         >
//           {loading.signUp ? (
//             <ClipLoader color="red" loading={true} size={20} />
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




import React, { useState, useContext } from "react";
import classes from "./SignUp.module.css";
import { Link, useNavigate,useLocation } from "react-router-dom";
import { auth } from "../../Utility/firebase";
import { ClipLoader } from "react-spinners";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { DataContext } from "../../Components/DataProvider/DataProvider";

function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState({ signIn: false, signUp: false });

  const { dispatch } = useContext(DataContext);
  const navigate = useNavigate();
  const navStateData = useLocation()
  console.log(navStateData)

  const authHandler = async (e) => {
    e.preventDefault();
    const { name } = e.target;

    if (name === "signin") {
      setLoading((prev) => ({ ...prev, signIn: true }));
      try {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        dispatch({ type: "SET_USER", user: userCredential.user }); 
        setError("");
        navigate(navStateData?.state?.redirect || "/");
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading((prev) => ({ ...prev, signIn: false }));
      }
    } else if (name === "signup") {
      setLoading((prev) => ({ ...prev, signUp: true }));
      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        dispatch({ type: "SET_USER", user: userCredential.user }); 
        setError("");
        navigate(navStateData?.state?.redirect || "/");
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading((prev) => ({ ...prev, signUp: false }));
      }
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
        <h1>Sign In</h1>
        {navStateData?.state?.message && (
          <small
            style={{
              padding: "5px",
              textAlign: "center",
              color: "red",
              fontWeight: "bold",
            }}
          >
            {navStateData?.state?.message}
          </small>
        )}

        <form onSubmit={(e) => e.preventDefault()}>
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
          <div>
            <label htmlFor="password">Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              id="password"
              required
            />
          </div>
          <button
            type="submit"
            name="signin"
            onClick={authHandler}
            className={classes.logInButton}
            disabled={loading.signIn}
          >
            {loading.signIn ? (
              <ClipLoader color="black" size={20} />
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        <p>
          By signing in you agree to the AMAZON FAKE CLONE Conditions of Use &
          Sale.
        </p>

        <button
          type="button"
          name="signup"
          onClick={authHandler}
          className={classes.login_register}
          disabled={loading.signUp}
        >
          {loading.signUp ? (
            <ClipLoader color="red" size={20} />
          ) : (
            "Create your Amazon Account"
          )}
        </button>

        {error && <small className={classes.error}>{error}</small>}
      </div>
    </section>
  );
}

export default Auth;
