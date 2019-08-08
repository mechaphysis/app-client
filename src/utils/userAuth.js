import jwtDecode from "jwt-decode";
import { EMPTY_STRING_READONLY } from "../constants/emptyDefaults";
import { AUTH_DETAILS_KEY } from "../constants/auth";
import axios from "axios";
import { test } from "ramda";

export const setUserAuthDetailsInLS = token =>
  localStorage.setItem(AUTH_DETAILS_KEY, `Bearer ${token}`);

export const getUserAuthDetailsFromLS = () =>
  localStorage.getItem(AUTH_DETAILS_KEY) || EMPTY_STRING_READONLY;

export const removeUserAuthDetailsFromLS = () =>
  localStorage.removeItem(AUTH_DETAILS_KEY) || EMPTY_STRING_READONLY;

export const isUserAuthenticated = () => {
  const userAuthDetails = getUserAuthDetailsFromLS();
  return {
    isAuthenticated: !!userAuthDetails && !!userAuthDetails.length
  };
};

export const isSessionExpired = () => {
  const bearerToken = getUserAuthDetailsFromLS();
  if (bearerToken) {
    const userAuthToken = bearerToken.split("Bearer ")[1];
    const decodedToken = jwtDecode(userAuthToken);
    return !!(decodedToken.exp * 1000 < Date.now());
  }

  return true;
};

export const setAuthorizationHeader = token => {
  const formattedToken = test(/Bearer /, token) ? token : `Bearer ${token}`;
  return (axios.defaults.headers.common["Authorization"] = formattedToken);
};

export const removeAuthorizationHeader = () => {
  return delete axios.defaults.headers.common["Authorization"];
};
