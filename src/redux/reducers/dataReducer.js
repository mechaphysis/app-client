import { findIndex, propEq, reject, update } from "ramda";
import {
  SET_POSTS,
  SET_POST,
  LIKE_POST,
  UNLIKE_POST,
  LOADING_DATA,
  DELETE_POST,
  CREATE_POST,
  SUBMIT_COMMENT
} from "../actionTypes";
import {
  EMPTY_ARRAY_READONLY,
  EMPTY_OBJECT_READONLY
} from "../../constants/emptyDefaults";

const initialState = {
  posts: EMPTY_ARRAY_READONLY,
  post: EMPTY_OBJECT_READONLY,
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOADING_DATA:
      return {
        ...state,
        loading: true
      };
    case SET_POSTS:
      return {
        ...state,
        loading: false,
        posts: action.payload
      };
    case SET_POST:
      return {
        ...state,
        loading: false,
        post: action.payload
      };
    case LIKE_POST:
    case UNLIKE_POST:
      let affectedPostIndex = findIndex(
        propEq("postId", action.payload.postId)
      )(state.posts);
      let updatedPosts = update(affectedPostIndex, action.payload, state.posts);
      return {
        ...state,
        posts: updatedPosts
      };
    case DELETE_POST:
      let postsWithoutDeleted = reject(propEq("postId", action.payload))(
        state.posts
      );
      return {
        ...state,
        posts: postsWithoutDeleted
      };
    case CREATE_POST:
      return {
        ...state,
        loading: false,
        posts: [action.payload, ...state.posts]
      };
    case SUBMIT_COMMENT:
      return {
        ...state,
        post: {
          ...state.post,
          comments: [action.payload, ...state.post.comments]
        }
      };
    default:
      return state;
  }
}
