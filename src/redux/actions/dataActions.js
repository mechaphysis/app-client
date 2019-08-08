import {
  SET_POSTS,
  LOADING_DATA,
  LIKE_POST,
  UNLIKE_POST
} from "../actionTypes";

import {
  getPostsService,
  getPostService,
  likePostService,
  unlikePostService,
  commentPostService
} from "../../services/postsService";
import { EMPTY_ARRAY_READONLY } from "../../constants/emptyDefaults";

export const getPosts = () => dispatch => {
  dispatch({
    type: LOADING_DATA
  });

  getPostsService()
    .then(data => {
      console.log("--> data from service: ", data);
      dispatch({
        type: SET_POSTS,
        payload: data
      });
    })
    .catch(error => {
      dispatch({
        type: SET_POSTS,
        payload: EMPTY_ARRAY_READONLY
      });
      console.log("Something went wrong: ", error);
    });
};

export const likePost = postId => dispatch => {
  likePostService(postId)
    .then(data => {
      dispatch({
        type: LIKE_POST,
        payload: data
      });
    })
    .catch(error => console.log("Something went wrong: ", error));
};

export const unlikePost = postId => dispatch => {
  unlikePostService(postId)
    .then(data => {
      dispatch({
        type: UNLIKE_POST,
        payload: data
      });
    })
    .catch(error => console.log("Something went wrong: ", error));
};
