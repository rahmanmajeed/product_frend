/* eslint-disable no-async-promise-executor */
import axios from "axios";

const API_END_POINT = require("./../../server");
const AUTH_TOKEN_KEY = "authToken";

export function loginUser(email, password) {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await axios({
        url: `${API_END_POINT.API_SERVER_URL}/api/auth/login`,
        method: "POST",
        data: {
          email: email,
          password: password
        }
      });

      setAuthToken(res.data.access_token);
      resolve(res);
    } catch (error) {
      console.error("Caught an error during login:", error);
      reject(error);
    }
  });
}

export function logoutUser() {
  clearAuthToken();
}

export function setAuthToken(token) {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  localStorage.setItem(AUTH_TOKEN_KEY, token);
}
export function getAuthToken() {
  return localStorage.getItem(AUTH_TOKEN_KEY);
}

export function clearAuthToken() {
  axios.defaults.headers.common.Authorization = "";
  localStorage.removeItem(AUTH_TOKEN_KEY);
  localStorage.removeItem("isLoggedIn");
}

export function isLoggedIn() {
  const authToken = getAuthToken();
  return !!authToken;
}

export function setTokenReqHeader() {
  const token = localStorage.getItem(AUTH_TOKEN_KEY);
  return `Bearer ${token}`;
}

export function register(user) {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await axios({
        url: `${API_END_POINT.API_SERVER_URL}/api/auth/register`,
        method: "POST",
        data: {
          name: user.name,
          email: user.email,
          password: user.password,
          password_confirmation: user.password_confirmation
        }
      });

      resolve(res);
    } catch (error) {
      console.error("Caught an error during register:", error);
      reject(error);
    }
  });
}
export const isLogStatus = localStorage.getItem("isLoggedIn");
