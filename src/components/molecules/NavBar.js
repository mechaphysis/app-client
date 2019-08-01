import React from "react";

//Material UI
import AppBar from "@material-ui/core/AppBar";
import ToolBar from "@material-ui/core/ToolBar";
import Button from "@material-ui/core/Button";

function NavBar() {
  return (
    <AppBar>
      <ToolBar>
        <Button color="inherit">Login</Button>
        <Button color="inherit">Home</Button>
        <Button color="inherit">Signup </Button>
      </ToolBar>
    </AppBar>
  );
}

export default NavBar;
