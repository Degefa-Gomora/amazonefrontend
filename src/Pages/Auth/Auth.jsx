// Importing core React and hooks
import  { useState, useContext } from "react";

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
  // Local state for form fields and UI control
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState({ signIn: false, signUp: false });
  const [isSignIn, setIsSignIn] = useState(true); // true = Sign In, false = Sign Up
  // Access global context and navigation utilities
  const { dispatch } = useContext(DataContext);
  const navigate = useNavigate();
  const navStateData = useLocation();
  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };
  // Handles both sign-in and sign-up form submission
  const authHandler = async (e) => {
    e.preventDefault();
    const action = isSignIn ? "signIn" : "signUp";

    setLoading((prev) => ({ ...prev, [action]: true }));

    try {
      let userCredential;

      if (isSignIn) {
        // Sign in existing user
        userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
      } else {
        // Create new user
        userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

        // Set display name after sign up or Set display name for the new user
        await updateProfile(userCredential.user, {
          displayName: name,
        });
      }
      // Update global state with authenticated user
      dispatch({ type: "SET_USER", user: userCredential.user });
      // Clear error and navigate to redirect path or home
      setError("");
      navigate(navStateData?.state?.redirect || "/");
    } catch (error) {
      // Show error message
      setError(error.message);
    } finally {
      // Stop loading state
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
        {/* Optional message passed from navigation state */}
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

