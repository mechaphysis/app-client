import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";

const AuthRoute = ({ component: Component, isAuthenticated, ...rest }) => {
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

const mapStateToProps = state => ({
  isAuthenticated: state.user.isAuthenticated
});

AuthRoute.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired
};

export default connect(mapStateToProps)(AuthRoute);
