import React, { Fragment } from "react";
import { PropTypes } from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import { connect } from "react-redux";
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
  const { classes, user } = props;

  let profileContent = user.loading ? (
    <p>Loading...</p>
  ) : user.isAuthenticated ? (
    <AuthenticatedProfile classes={classes} user={user} />
  ) : (
    <ProfileNotFound classes={classes} />
  );

  return <Fragment>{profileContent}</Fragment>;
};

const mapStateToProps = state => ({
  user: state.user,
  loading: state.loading
});

Profile.propTypes = {
  user: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
};
export default connect(mapStateToProps)(withStyles(styles)(Profile));
