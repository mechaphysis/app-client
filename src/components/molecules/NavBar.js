import React from "react";
import NavLink from "react-router-dom/Link";

//Material UI
import AppBar from "@material-ui/core/AppBar";
import ToolBar from "@material-ui/core/ToolBar";
import Button from "@material-ui/core/Button";

function NavBar() {
  return (
    <AppBar>
      <ToolBar className="nav-container">
        <Button color="inherit" component={NavLink} to="/login">
          Login
        </Button>
        <Button color="inherit" component={NavLink} to="/">
          Home
        </Button>
        <Button color="inherit" component={NavLink} to="/signup">
          Signup
        </Button>
      </ToolBar>
    </AppBar>
  );
}

export default NavBar;
