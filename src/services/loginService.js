import request from "../utils/request";

export const loginUser = async payload => request.post("/login", payload);
