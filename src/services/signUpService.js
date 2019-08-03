import request from "../utils/request";

export const signUpUser = async payload => request.post("/signup", payload);
