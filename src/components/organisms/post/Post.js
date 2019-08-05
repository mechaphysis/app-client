import React from "react";
import { Link } from "react-router-dom";

//For date formatting:
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

//Material UI
import WithStyles from "@material-ui/styles/WithStyles";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

//Styles in JSS manner:
import { postStyles } from "./styles";
const styles = postStyles;

//Extend dayjs to show date in format 'X days ago'
dayjs.extend(relativeTime);

function Post(props) {
  const {
    classes,
    post: {
      postId,
      likeCount,
      commentCount,
      userImage,
      body,
      createdAt,
      userHandle
    }
  } = props;
  return (
    <Card className={classes.card}>
      <CardMedia
        className={classes.image}
        image={userImage}
        title="Profile pic"
      />
      <CardContent className={classes.content}>
        <Typography
          variant="h5"
          color="primary"
          component={Link}
          to={`/users/${userHandle}`}
        >
          {userHandle}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {dayjs(createdAt).fromNow()}
        </Typography>
        <Typography variant="body1">{body}</Typography>
      </CardContent>
    </Card>
  );
}

export default WithStyles(styles)(Post);
