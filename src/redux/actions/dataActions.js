import {
  SET_POSTS,
  SET_POST,
  LOADING_DATA,
  STOP_LOADING_UI,
  LOADING_UI,
  LIKE_POST,
  UNLIKE_POST,
  DELETE_POST,
  CREATE_POST,
  SET_ERRORS,
  CLEAR_ERRORS,
  SUBMIT_COMMENT,
  SET_PROFILE
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

import { getUserDataService } from "../../services/userService";
import {
  EMPTY_ARRAY_READONLY,
  EMPTY_OBJECT_READONLY
} from "../../constants/emptyDefaults";

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

export const getPost = postId => dispatch => {
  dispatch({
    type: LOADING_UI
  });

  getPostService(postId)
    .then(data => {
      dispatch({
        type: SET_POST,
        payload: data
      });
      dispatch({
        type: STOP_LOADING_UI
      });
    })
    .catch(error => {
      dispatch({
        type: SET_POST,
        payload: EMPTY_OBJECT_READONLY
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
  dispatch({ type: LOADING_UI });

  addPostService(body)
    .then(data => {
      dispatch({
        type: CREATE_POST,
        payload: data
      });
      dispatch({
        type: CLEAR_ERRORS
      });
      dispatch({ type: STOP_LOADING_UI });
    })
    .catch(error => {
      dispatch({
        type: SET_ERRORS,
        payload: error.response.data
      });
      console.log("Something went wrong: ", error);
    });
};

export const submitComment = (postId, body) => dispatch => {
  commentPostService(postId, body)
    .then(data => {
      dispatch({
        type: SUBMIT_COMMENT,
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

export const clearErrors = () => dispatch => {
  dispatch({
    type: CLEAR_ERRORS
  });
};

export const getUserData = userHandle => dispatch => {
  dispatch({
    type: LOADING_DATA
  });
  getUserDataService(userHandle)
    .then(data => {
      dispatch({
        type: SET_POSTS,
        payload: data.posts
      });
      dispatch({
        type: SET_PROFILE,
        payload: data.user
      });
    })
    .catch(error => {
      dispatch({
        type: SET_POSTS,
        payload: null
      });
      console.log("Somethin went wrong: ", error);
    });
};
