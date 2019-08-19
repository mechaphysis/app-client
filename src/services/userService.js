import request from "../utils/request";

export const signUpService = async payload => request.post("/signup", payload);

export const loginService = async payload => request.post("/login", payload);

export const getUserService = async () => request.get("/user");

export const uploadImageService = async payload =>
  request.post("/user/image", payload);

export const editUserDetailsService = async payload =>
  request.post("/user", payload);

/**
 * For retrieving another user's data and displaying
 * on their respective user page:
 * */

export const getUserDataService = async userHandle =>
  request.get(`/user/${userHandle}`);
