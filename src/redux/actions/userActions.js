import {
  SET_USER,
  SET_UNAUTHENTICATED,
  SET_ERRORS,
  CLEAR_ERRORS,
  LOADING_UI,
  LOADING_USER
} from "../actionTypes";

//Service:
import {
  signUpService,
  loginService,
  getUserService,
  uploadImageService
} from "../../services/userService";

//Auth helpers:
import {
  setUserAuthDetailsInLS,
  setAuthorizationHeader,
  removeUserAuthDetailsFromLS,
  removeAuthorizationHeader
} from "../../utils/userAuth";

export const signUpUser = (form, history) => dispatch => {
  dispatch({
    type: LOADING_UI
  });
  signUpService(form)
    .then(data => {
      setUserAuthDetailsInLS(data.token);
      setAuthorizationHeader(data.token);
      dispatch(getUserData());
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

export const loginUser = (form, history) => dispatch => {
  dispatch({
    type: LOADING_UI
  });

  loginService(form)
    .then(data => {
      setUserAuthDetailsInLS(data.token);
      setAuthorizationHeader(data.token);
      dispatch(getUserData());
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

export const getUserData = () => dispatch => {
  dispatch({
    type: LOADING_USER
  });
  getUserService()
    .then(userData => {
      dispatch({
        type: SET_USER,
        payload: userData
      });
    })
    .catch(error => console.log("Something went wrong: ", error));
};

export const logOutUser = () => dispatch => {
  removeUserAuthDetailsFromLS();
  removeAuthorizationHeader();
  dispatch({
    type: SET_UNAUTHENTICATED
  });
};

export const uploadImage = formData => dispatch => {
  dispatch({
    type: LOADING_USER
  });
  uploadImageService(formData)
    .then(() => {
      dispatch(getUserData());
    })
    .catch(error => console.log("Something went wrong: ", error));
};
