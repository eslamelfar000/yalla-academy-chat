// src/hooks/useAxios.js
import axios from "axios";
import { base_url } from "../constant/base_url";
import Cookies from 'js-cookie';

export function useAxios() {
  const getToken = () => {
    return localStorage.getItem('yall_auth_token') || sessionStorage.getItem('yall_auth_token') || Cookies.get("partner_auth_token");
  };

  return axios.create({
    baseURL: base_url,
    headers: {
      Authorization: `Bearer ${getToken() || ""}`,
      "Content-Type": "multipart/form-data",
      Accept: "application/json",
    },
  });
}

// Create api instance with authentication
const getToken = () => {
  // Check multiple possible token storage locations and keys
  const possibleTokens = [
    Cookies.get('partner_auth_token'), // Check cookie token
    localStorage.getItem('yall_auth_token'),
    sessionStorage.getItem('yall_auth_token'),
    localStorage.getItem('yall_auth_token'),
    sessionStorage.getItem('yall_auth_token'),
    localStorage.getItem('yall_access_token'),
    sessionStorage.getItem('yall_access_token'),
    Cookies.get('yall_auth_token'), // Check cookie token
  ].filter(Boolean); // Remove null/undefined values
  
  const token = possibleTokens[0]; // Use the first available token
  
  
  return token;
};

export const api = axios.create({
  baseURL: base_url,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Add request interceptor to automatically add auth token
api.interceptors.request.use(
  (config) => {
    const token = getToken();
    
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
    }
    
    
    return config;
  },
  (error) => {
    console.error("Request interceptor error:", error);
    return Promise.reject(error);
  }
);

// Add response interceptor to handle 401 errors
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Clear all authentication data
      localStorage.removeItem('yall_auth_token');
      sessionStorage.removeItem('yall_auth_token');
      localStorage.removeItem('yall_auth_token');
      sessionStorage.removeItem('yall_auth_token');
      localStorage.removeItem('yall_access_token');
      sessionStorage.removeItem('yall_access_token');
      localStorage.removeItem('yall_user_data');
      sessionStorage.removeItem('yall_user_data');
      
      // Remove cookie token
      Cookies.remove('yall_auth_token', { path: "/" });
      // Cookies.remove('partner_auth_token', { path: "/" });
      
      // Redirect to login page
      // window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Example usage of the api instance:
export const fetchData = async () => {
  try {
    const response = await api.get("/some-endpoint");
    return response.data;
  } catch (error) {
    throw error;
  }
};

