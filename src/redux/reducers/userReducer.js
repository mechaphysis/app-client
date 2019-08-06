import {
  SET_USER,
  SET_AUTHENTICATED,
  SET_UNAUTHENTICATED
} from "../actionTypes";
import {
  EMPTY_OBJECT_READONLY,
  EMPTY_ARRAY_READONLY
} from "../../constants/emptyDefaults";

const initialState = {
  isAuthenticated: false,
  credentials: EMPTY_OBJECT_READONLY,
  likes: EMPTY_ARRAY_READONLY,
  notifications: EMPTY_ARRAY_READONLY
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_AUTHENTICATED:
      return {
        ...state,
        isAuthenticated: true
      };
    case SET_UNAUTHENTICATED:
      return initialState;
    case SET_USER:
      return {
        isAuthenticated: true,
        ...action.payload
      };
    default:
      return state;
  }
}
