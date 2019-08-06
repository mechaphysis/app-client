import { SET_USER, SET_ERRORS, CLEAR_ERRORS, LOADING_UI } from "../actionTypes";

//Service:
import { loginService } from "../../services/loginService";
import { userService } from "../../services/userService";

//Auth helpers:
import {
  setUserAuthDetailsInLS,
  setAuthorizationHeader
} from "../../utils/userAuth";

export const loginUser = (form, history) => dispatch => {
  dispatch({
    type: LOADING_UI
  });

  loginService(form)
    .then(data => {
      setUserAuthDetailsInLS(data.token);
      setAuthorizationHeader(data.token);
      dispatch(fetchUserData());
      dispatch({
        type: CLEAR_ERRORS
      });
      history.push("/");
    })
    .catch(error => {
      dispatch({
        type: SET_ERRORS,
        payload: error.response.data.errors
      });
    });
};

export const fetchUserData = () => dispatch => {
  userService()
    .then(userData => {
      dispatch({
        type: SET_USER,
        payload: userData
      });
    })
    .catch(error => console.log("Something went wrong: ", error));
};
