import request from "../utils/request";

export const userService = async () => request.get("/user");
