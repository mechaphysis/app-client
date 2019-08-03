import jwtDecode from "jwt-decode";
import { EMPTY_OBJECT_READONLY } from "../constants/emptyDefaults";
import { AUTH_DETAILS_KEY } from "../constants/auth";

export const setUserAuthDetailsInLS = token =>
  localStorage.setItem(AUTH_DETAILS_KEY, `Bearer ${token}`);

export const getUserAuthDetailsFromLS = () =>
  localStorage.getItem(AUTH_DETAILS_KEY) || EMPTY_OBJECT_READONLY;

export const isUserAuthenticated = () => {
  const userAuthDetails = getUserAuthDetailsFromLS();
  return {
    isAuthenticated: !!userAuthDetails && !!userAuthDetails.length
  };
};

export const isSessionExpired = () => {
  const userAuthToken = getUserAuthDetailsFromLS().split(" ")[1];

  const decodedToken = jwtDecode(userAuthToken);
  return !!(decodedToken.exp * 1000 < Date.now());
};
