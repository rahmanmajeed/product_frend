/* eslint-disable no-async-promise-executor */

import axios from "axios";
const API_END_POINT = require("./../../server");

async function getToken() {
  const token = await localStorage.getItem("authToken");
  const authToken = await `Bearer ${token}`;
  return authToken;
}

export function allProduct() {
  return new Promise(async (resolve, reject) => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: await getToken()
    };
    axios
      .get(`${API_END_POINT.API_SERVER_URL}/api/products`, { headers: headers })
      .then(res => {
        resolve(res);
      })
      .catch(error => {
        reject(error);
      });
  });
}
export function createProduct(product) {
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("authToken")}`
  };
  return new Promise((resolve, reject) => {
    axios
      .post(`${API_END_POINT.API_SERVER_URL}/api/products`, product, {
        headers: headers
      })
      .then(res => {
        resolve(res);
      })
      .catch(error => {
        reject(error);
      });
  });
}

export function updateProduct(product) {
  return new Promise(async (resolve, reject) => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: await getToken()
    };
    axios
      .put(`${API_END_POINT.API_SERVER_URL}/api/product/${product.id}`, product, {
        headers: headers
      })
      .then(res => {
        resolve(res);
      })
      .catch(error => {
        reject(error);
      });
  });
}

export function deleteProduct(product) {
  return new Promise(async (resolve, reject) => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: await getToken()
    };
    axios
      .delete(`${API_END_POINT.API_SERVER_URL}/api/product/${product.id}`, {
        headers: headers
      })
      .then(res => {
        resolve(res);
      })
      .catch(error => {
        reject(error);
      });
  });
}
