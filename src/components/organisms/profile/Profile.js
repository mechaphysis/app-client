import React, { Fragment } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import { useSelector } from "react-redux";
import { AuthenticatedProfile } from "../../molecules/AuthenticatedProfile";
import { ProfileNotFound } from "../../molecules/ProfileNotFound";
import { avatarStyles } from "../../../styles/general";
import ProfileSkeleton from "../../../utils/ProfileSkeleton";

const styles = {
  ...avatarStyles,
  paper: {
    padding: 20
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
    <ProfileSkeleton />
  ) : user.isAuthenticated ? (
    <AuthenticatedProfile classes={classes} user={user} />
  ) : (
    <ProfileNotFound classes={classes} />
  );

  return <Fragment>{profileContent}</Fragment>;
};

export default withStyles(styles)(Profile);
