import Cookies from 'js-cookie';

// ─── Storage keys for Partner (isolated from student keys) ────────────────────
export const PARTNER_TOKEN_KEY  = 'partner_auth_token';
export const PARTNER_USER_KEY   = 'partner_user_data';

const usePartnerAuthToken = () => {
  // ── Token ──────────────────────────────────────────────────────────────────
  const setToken = (token, options = {}) => {
    if (!token) return console.warn('[Partner] Empty token. Not setting.');
    Cookies.set(PARTNER_TOKEN_KEY, token, {
      path: '/',
      secure: true,
      sameSite: 'Strict',
      expires: 365 * 10,
      ...options,
    });
    // Also mirror to localStorage for the axios interceptor to pick up easily
    // localStorage.setItem(PARTNER_TOKEN_KEY, token);
  };

  const getToken = () =>
    Cookies.get(PARTNER_TOKEN_KEY) ||
    // localStorage.getItem(PARTNER_TOKEN_KEY) ||
    null;

  const removeToken = () => {
    Cookies.remove(PARTNER_TOKEN_KEY, { path: '/' });
    // localStorage.removeItem(PARTNER_TOKEN_KEY);
  };

  // ── User data ──────────────────────────────────────────────────────────────
  const setPartnerUser = (userData) => {
    if (!userData) return;
    localStorage.setItem(PARTNER_USER_KEY, JSON.stringify(userData));
  };

  const getPartnerUser = () => {
    try {
      return JSON.parse(localStorage.getItem(PARTNER_USER_KEY) || 'null');
    } catch {
      return null;
    }
  };

  const removePartnerUser = () => {
    localStorage.removeItem(PARTNER_USER_KEY);
  };

  // ── Logout (clears only partner data) ─────────────────────────────────────
  const logout = () => {
    removeToken();
    removePartnerUser();
    localStorage.removeItem('partnerNotesSeen');
    console.log('[Partner] Auth data cleared');
  };

  return {
    setToken,
    getToken,
    removeToken,
    setPartnerUser,
    getPartnerUser,
    removePartnerUser,
    logout,
  };
};

export default usePartnerAuthToken;
