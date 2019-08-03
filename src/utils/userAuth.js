import { EMPTY_OBJECT_READONLY } from "../constants/emptyDefaults";
import { AUTH_DETAILS_KEY } from "../constants/auth";

export const setUserAuthDetailsInLS = token =>
  localStorage.setItem(AUTH_DETAILS_KEY, `Bearer ${token}`);

export const getUserAuthDetailsFromLS = () =>
  localStorage.getItem(AUTH_DETAILS_KEY || EMPTY_OBJECT_READONLY);
