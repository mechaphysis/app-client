import request from "../utils/request";

export const loginService = async payload => request.post("/login", payload);
