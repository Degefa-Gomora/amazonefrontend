// import axios from 'axios';

// //for Backend Communication
// const axiosInstance = axios.create({
//   baseURL: "http://localhost:5000" // for local host
//   // baseURL: "https://amazonebacend.onrender.com",
//   // baseURL:"https://amazone.degefagomora.com",
// });

// export { axiosInstance };


import axios from "axios";

// for Backend Communication
const axiosInstance = axios.create({
  // Use the environment variable for the backend URL
  baseURL: import.meta.env.VITE_BACKEND_URL,
});

export { axiosInstance };