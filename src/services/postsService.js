import request from "../utils/request";

export const getPostsService = () => request.get("/posts");

export const getPostService = postId => request.get(`/post/${postId}`);

export const likePostService = postId => request.post(`/post/${postId}/like`);

export const unlikePostService = postId =>
  request.post(`/post/${postId}/unlike`);

export const commentPostService = (postId, payload) =>
  request.post(`/post/${postId}/comment`, payload);

export const deletePostService = postId => request.del(`/post/${postId}`);

export const addPostService = payload => request.post(`/post`, payload);
