import React from "react";
import { Route, Redirect } from "react-router-dom";
//Auth helpers:
import { isSessionExpired } from "../../utils/userAuth";

const AuthRoute = ({ component: Component, ...rest }) => {
  const sessionHasExpired = isSessionExpired();
  return (
    <Route
      {...rest}
      render={props =>
        sessionHasExpired === true ? (
          <Component {...props} />
        ) : (
          <Redirect to="/" />
        )
      }
    />
  );
};

export default AuthRoute;
