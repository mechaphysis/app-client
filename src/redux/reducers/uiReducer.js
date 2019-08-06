import { SET_ERRORS, CLEAR_ERRORS, LOADING_UI } from "../actionTypes";
import { EMPTY_OBJECT_READONLY } from "../../constants/emptyDefaults";

const initialState = {
  loading: false,
  errors: EMPTY_OBJECT_READONLY
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_ERRORS:
      return {
        ...state,
        loading: false,
        errors: action.payload
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        loading: false,
        errors: EMPTY_OBJECT_READONLY
      };
    case LOADING_UI:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
}
