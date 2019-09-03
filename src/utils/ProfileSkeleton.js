import React from "react";

import skeletonStyles from "../styles/skeleton";
import NoImage from "../assets/no-image.png";

// Material UI
import Paper from "@material-ui/core/Paper";
import Avatar from "@material-ui/core/Avatar";
import LocationOn from "@material-ui/icons/LocationOn";
import LinkIcon from "@material-ui/icons/Link";
import CalendarIcon from "@material-ui/icons/CalendarToday";
import withStyles from "@material-ui/core/styles/withStyles";
const styles = {
  ...skeletonStyles,
  bigAvatar: {
    margin: 10,
    width: 200,
    height: 200
  },
  paper: {
    padding: 20
  },
  profile: {
    "& hr": {
      border: "none",
      margin: "0 0 10px 0"
    }
  },
  fullLine: {
    height: 15,
    backgroundColor: "rgb(0,0,0,0.6)",
    width: "100%",
    marginBottom: 10
  }
};

const ProfileSkeleton = props => {
  const { classes } = props;
  return (
    <Paper className={classes.paper}>
      <div className={classes.profile}>
        <div className="image-wrapper">
          <Avatar alt={`Profile`} src={NoImage} className={classes.bigAvatar} />
        </div>
        <hr className={classes.hiddenHR} />
        <div className="profile-details">
          <div className={classes.handle} />
          <hr className={classes.hiddenHR} />
          <div className={classes.fullLine} />
          <div className={classes.fullLine} />
          <hr className={classes.hiddenHR} />
          <LocationOn color="primary" /> <span>Location</span>
          <hr className={classes.hiddenHR} />
          <LinkIcon color="primary" /> https://website.com
          <hr className={classes.hiddenHR} />
          <CalendarIcon color="primary" /> Today
        </div>
      </div>
    </Paper>
  );
};

export default withStyles(styles)(ProfileSkeleton);
