import React from "react";
import { Link } from "react-router-dom";

//Material UI
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";

export const ProfileNotFound = props => {
  const { classes } = props;
  return (
    <Paper className={classes.paper}>
      <Typography>No Profile found, please login again</Typography>
      <div className={classes.buttons}>
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to="/login"
        >
          Login
        </Button>
        <Button
          variant="contained"
          color="secondary"
          component={Link}
          to="/signup"
        >
          Sign Up
        </Button>
      </div>
    </Paper>
  );
};
