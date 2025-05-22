import axios from 'axios';


const axiosInstance = axios.create({
  // baseURL: "http://localhost:5000" // for local host
  baseURL: "https://amazonebacend.onrender.com",
});

export { axiosInstance };