import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

const AuthRoute = ({ component: Component, ...rest }) => {
  // connec to redux using hooks:
  const isAuthenticated = useSelector(store => store.user.isAuthenticated);

  return (
    <Route
      {...rest}
      render={props =>
        isAuthenticated === true ? (
          <Redirect to="/" />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

export default AuthRoute;
