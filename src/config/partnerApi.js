// Partner-specific Axios instance.
// Reads the auth token from partner_auth_token (not from yall_auth_token)
// so partner API calls are fully isolated from student sessions.

import axios from 'axios';
import Cookies from 'js-cookie';
import { base_url } from '../constant/base_url';
import { PARTNER_TOKEN_KEY } from '../hooks/usePartnerAuthToken';

const getPartnerToken = () =>
  Cookies.get(PARTNER_TOKEN_KEY) ||
  localStorage.getItem(PARTNER_TOKEN_KEY) ||
  null;

export const partnerApi = axios.create({
  baseURL: base_url,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// ── Request interceptor: inject partner token ──────────────────────────────
partnerApi.interceptors.request.use(
  (config) => {
    const token = getPartnerToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ── Response interceptor: handle 401 (only clears partner data) ───────────
partnerApi.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      Cookies.remove(PARTNER_TOKEN_KEY, { path: '/' });
      localStorage.removeItem(PARTNER_TOKEN_KEY);
      localStorage.removeItem('partner_user_data');
      // Don't redirect here — let the components handle it
    }
    return Promise.reject(error);
  }
);
