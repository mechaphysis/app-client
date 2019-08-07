import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
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

const mapStateToProps = state => ({
  isAuthenticated: state.user.isAuthenticated
});

AuthRoute.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired
};

export default connect(mapStateToProps)(AuthRoute);
