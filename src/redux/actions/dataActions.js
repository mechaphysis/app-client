import {
  SET_POSTS,
  LOADING_DATA,
  LIKE_POST,
  UNLIKE_POST,
  DELETE_POST,
  CREATE_POST,
  SET_ERRORS,
  CLEAR_ERRORS
} from "../actionTypes";

import {
  getPostsService,
  getPostService,
  likePostService,
  unlikePostService,
  commentPostService,
  deletePostService,
  addPostService
} from "../../services/postsService";
import { EMPTY_ARRAY_READONLY } from "../../constants/emptyDefaults";

export const getPosts = () => dispatch => {
  dispatch({
    type: LOADING_DATA
  });

  getPostsService()
    .then(data => {
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

export const deletePost = postId => dispatch => {
  deletePostService(postId)
    .then(() => {
      dispatch({
        type: DELETE_POST,
        payload: postId
      });
    })
    .catch(error => console.log("Something went wrong: ", error));
};

export const addPost = body => dispatch => {
  dispatch({ type: LOADING_DATA });

  addPostService(body)
    .then(data => {
      dispatch({
        type: CREATE_POST,
        payload: data
      });
      dispatch({
        type: CLEAR_ERRORS
      });
    })
    .catch(error => {
      dispatch({
        type: SET_ERRORS,
        payload: error.response.data
      });
      console.log("Something went wrong: ", error);
    });
};
