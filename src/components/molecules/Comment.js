import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";

//Material UI
import Typography from "@material-ui/core/Typography";
import { Avatar } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
//Styles
import withStyles from "@material-ui/core/styles/withStyles";
import { separatorStyles, avatarStyles } from "../../styles/general";

const styles = {
  ...separatorStyles,
  ...avatarStyles
};

const Comment = props => {
  const { createdAt, userImage, userHandle, body, classes } = props;
  return (
    <Fragment>
      <Grid item sm={12}>
        <Grid container>
          <Grid item sm={2}>
            <Avatar
              src={userImage}
              alt={`profile picture of ${userHandle}`}
              className={classes.avatar}
            />
          </Grid>
          <Grid item>
            <div className={classes.commentData}>
              <Typography
                variant="h6"
                component={Link}
                to={`/users/${userHandle}`}
                color="primary"
              >
                {userHandle}
              </Typography>
              <Typography variant="body2" color="secondary">
                {dayjs(createdAt).format("h:mm a, MMMM DD YYYY")}
              </Typography>
              <hr className={classes.hiddenHR} />
              <Typography variant="body1">{body}</Typography>
            </div>
          </Grid>
        </Grid>
      </Grid>
      <hr className={classes.visibleHR} />
    </Fragment>
  );
};

export default withStyles(styles)(Comment);
