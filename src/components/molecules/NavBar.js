import React from "react";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";

import UnAuthenticatedButtons from "./UnAuthenticatedButtons";
import AuthenticatedButtons from "./AuthenticatedButtons";
//Material UI
import AppBar from "@material-ui/core/AppBar";
import ToolBar from "@material-ui/core/ToolBar";

const NavBar = () => {
  // connect to redux using hooks:
  const isAuthenticated = useSelector(store => store.user.isAuthenticated);
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

export default NavBar;
