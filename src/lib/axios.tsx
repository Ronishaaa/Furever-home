import axios from "axios";

// eslint-disable-next-line react-refresh/only-export-components
export const instance = axios.create({
  baseURL: "http://localhost:3001",
  headers: { "Content-Type": "application/json" },
});
