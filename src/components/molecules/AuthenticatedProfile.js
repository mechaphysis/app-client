import React, { Fragment } from "react";
import { Link } from "react-router-dom";

import dayjs from "dayjs";
//Material UI
import Paper from "@material-ui/core/Paper";
import Avatar from "@material-ui/core/Avatar";
import MuiLink from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import LocationOn from "@material-ui/icons/LocationOn";
import LinkIcon from "@material-ui/icons/Link";
import CalendarToday from "@material-ui/icons/CalendarToday";

export const AuthenticatedProfile = props => {
  const {
    classes,
    user: {
      credentials: { imageUrl, handle, bio, website, location, createdAt }
    }
  } = props;

  return (
    <Paper className={classes.paper}>
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
    </Paper>
  );
};
