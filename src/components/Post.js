import React from "react";
import { Link } from "react-router-dom";

//Material UI
import WithStyles from "@material-ui/styles/WithStyles";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

//Styles in JSS manner:
const styles = {
  card: {
    display: "flex",
    marginBottom: 20
  },
  image: {
    minWidth: 200,
    objectFit: "cover"
  },
  content: {
    padding: 25
  }
};

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
          {createdAt}
        </Typography>
        <Typography variant="body1">{body}</Typography>
      </CardContent>
    </Card>
  );
}

export default WithStyles(styles)(Post);
