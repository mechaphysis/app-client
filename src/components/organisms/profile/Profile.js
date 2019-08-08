import React, { Fragment } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import { useSelector } from "react-redux";
import { AuthenticatedProfile } from "../../molecules/AuthenticatedProfile";
import { ProfileNotFound } from "../../molecules/ProfileNotFound";

const styles = {
  paper: {
    padding: 20
  },
  avatar: {
    margin: 10
  },
  bigAvatar: {
    margin: 10,
    width: 200,
    height: 200
  },
  buttons: {
    textAlign: "center",
    "& a": {
      margin: "20px 10px"
    }
  },
  profile: {
    "& hr": {
      border: "none",
      margin: "0 0 10px 0"
    }
  }
}; //temporary

const Profile = props => {
  // connect to redux using hooks:
  const user = useSelector(store => store.user);

  const { classes } = props;
  let profileContent = user.loading ? (
    <p>Loading...</p>
  ) : user.isAuthenticated ? (
    <AuthenticatedProfile classes={classes} user={user} />
  ) : (
    <ProfileNotFound classes={classes} />
  );

  return <Fragment>{profileContent}</Fragment>;
};

export default withStyles(styles)(Profile);
