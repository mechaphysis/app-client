import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import withStyles from "@material-ui/core/styles/withStyles";
import dayjs from "dayjs";

import MuiLink from "@material-ui/core/Link";
import Avatar from "@material-ui/core/Avatar";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import LocationOn from "@material-ui/icons/LocationOn";
import LinkIcon from "@material-ui/icons/Link";
import CalendarToday from "@material-ui/icons/CalendarToday";

import { avatarStyles } from "../../../styles/general";

const styles = {
  ...avatarStyles,
  paper: {
    padding: 20
  },
  profile: {
    "& hr": {
      border: "none",
      margin: "0 0 10px 0"
    }
  }
};

const StaticProfile = props => {
  const {
    classes,
    profile: { handle, createdAt, imageUrl, bio, website, location }
  } = props;

  return (
    <Paper className={classes.paper}>
      <div className={classes.profile}>
        <Avatar alt={`Profile`} src={imageUrl} className={classes.bigAvatar} />
        <MuiLink
          component={Link}
          to={`/users/${handle}`}
          color="primary"
          variant="h5"
        >
          @{handle}
        </MuiLink>
        <hr />
        {bio && <Typography variant="body2">{bio}</Typography>}
        <hr />
        {location && (
          <Fragment>
            <LocationOn color="primary">
              <span>{location}</span>
            </LocationOn>
            <hr />
          </Fragment>
        )}
        {website && (
          <Fragment>
            <LinkIcon color="primary" />
            <a href={website} target="_blank" rel="noopener noreferrer">
              {" "}
              {website}
            </a>
            <hr />
          </Fragment>
        )}
        <CalendarToday color="primary" />{" "}
        <span>Joined {dayjs(createdAt).format("MMM YYYY")}</span>
      </div>
    </Paper>
  );
};

export default withStyles(styles)(StaticProfile);
