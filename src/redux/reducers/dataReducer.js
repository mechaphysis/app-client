import { findIndex, propEq } from "ramda";
import {
  SET_POSTS,
  LIKE_POST,
  UNLIKE_POST,
  LOADING_DATA,
  DELETE_POST
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
        posts: action.payload,
        loading: false
      };
    case LIKE_POST:
    case UNLIKE_POST:
      let unlikedPostIndex = findIndex(propEq("postId", action.payload.postId))(
        state.posts
      );
      state.posts[unlikedPostIndex] = action.payload;
      return {
        ...state
      };
    case DELETE_POST:
      let deletedPostIndex = findIndex(propEq("postId", action.payload))(
        state.posts
      );
      state.posts.splice(deletedPostIndex, 1);
      return {
        ...state
      };
    default:
      return state;
  }
}
