import axios from "axios";

export const makeRequest = axios.create({
  baseURL: "https://zone-clocker-back.onrender.com/api/",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});
