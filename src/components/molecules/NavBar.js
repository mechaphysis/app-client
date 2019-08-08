import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import UnAuthenticatedButtons from "./UnAuthenticatedButtons";
import AuthenticatedButtons from "./AuthenticatedButtons";
//Material UI
import AppBar from "@material-ui/core/AppBar";
import ToolBar from "@material-ui/core/ToolBar";

const NavBar = props => {
  const { isAuthenticated } = props;
  return (
    <AppBar>
      <ToolBar className="nav-container">
        {isAuthenticated ? (
          <AuthenticatedButtons />
        ) : (
          <UnAuthenticatedButtons />
        )}
      </ToolBar>
    </AppBar>
  );
};

NavBar.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired
};
const mapStateToProps = state => ({
  isAuthenticated: state.user.isAuthenticated
});
export default connect(mapStateToProps)(NavBar);
