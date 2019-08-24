import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

// Components:
import ButtonWithTooltip from "../../atoms/ButtonWithTooltip";
import PostDialog from "../../molecules/PostDetailsDialog";
import LikeButton from "../../atoms/LikeButton";
import DeleteButton from "../../atoms/DeleteButton";

//For date formatting:
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

//Material UI
import WithStyles from "@material-ui/styles/WithStyles";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import ChatIcon from "@material-ui/icons/Chat";

//Styles in JSS manner:
import { postStyles } from "./styles";

const styles = postStyles;
//Extend dayjs to show date in format 'X days ago'
dayjs.extend(relativeTime);

const Post = props => {
  // connect to redux store:
  const user = useSelector(store => store.user);
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
    },
    openDialog
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
        <DeleteButton user={user} userHandle={userHandle} postId={postId} />
        <Typography variant="body2" color="textSecondary">
          {dayjs(createdAt).fromNow()}
        </Typography>
        <Typography variant="body1">{body}</Typography>
        <LikeButton postId={postId} user={user} />
        <span>{likeCount} Likes</span>
        <ButtonWithTooltip tipTitle="comments">
          <ChatIcon color="primary" />
        </ButtonWithTooltip>
        <span>{commentCount} Comments</span>
        <PostDialog
          postId={postId}
          userHandle={userHandle}
          likeCount={likeCount}
          commentCount={commentCount}
          openDialog={openDialog}
        />
      </CardContent>
    </Card>
  );
};

export default WithStyles(styles)(Post);
