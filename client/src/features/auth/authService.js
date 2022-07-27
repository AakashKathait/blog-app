import axios from "axios";

const API_URL = "/api/user/";
const BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://arrayblogapp.herokuapp.com"
    : "http://localhost:5000";
const register = async (userData) => {
  const res = await axios.post(BASE_URL + API_URL + "register", userData);
  if (res.data) {
    localStorage.setItem("user", JSON.stringify(res.data));
  }

  return res.data;
};

export const logout = async () => {
  localStorage.removeItem("user");
};

export const login = async (userData) => {
  const res = await axios.post(BASE_URL + API_URL + "login", userData);
  if (res.data) {
    localStorage.setItem("user", JSON.stringify(res.data));
  }

  return res.data;
};

const authService = {
  register,
  logout,
  login,
};

export default authService;
