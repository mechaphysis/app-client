import request from "../utils/request";

export const fetchPosts = () => request.get("/posts");
