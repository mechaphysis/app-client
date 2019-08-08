import { findIndex, propEq } from "ramda";
import {
  SET_POSTS,
  LIKE_POST,
  UNLIKE_POST,
  LOADING_DATA
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
      let index = findIndex(propEq("postId", action.payload.postId))(
        state.posts
      );
      state.posts[index] = action.payload;
      return {
        ...state
      };
    default:
      return state;
  }
}
