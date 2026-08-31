import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://json-server-api-oxsu.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;