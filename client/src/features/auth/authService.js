import axios from "axios";

const API_URL = "/api/user/";

const register = async (userData) => {
  const res = await axios.post(API_URL + "register", userData);
  if (res.data) {
    localStorage.setItem("user", JSON.stringify(res.data));
  }

  return res.data;
};

export const logout = async () => {
  localStorage.removeItem("user");
};

export const login = async (userData) => {
  const res = await axios.post(API_URL + "login", userData);
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
