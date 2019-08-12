import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { find, propEq } from "ramda";
// redux actions:
import { likePost, unlikePost } from "../../../redux/actions/dataActions";

// Components:
import ButtonWithTooltip from "../../atoms/ButtonWithTooltip";
import DeletePost from "../../molecules/DeletePost";
import PostDialog from "../../molecules/PostDialog";

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
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";

//Styles in JSS manner:
import { postStyles } from "./styles";
const styles = postStyles;

//Extend dayjs to show date in format 'X days ago'
dayjs.extend(relativeTime);

const Post = props => {
  // connect to redux store:
  const dispatch = useDispatch();
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
    }
  } = props;

  const isPostLiked = () => {
    return user.likes && find(propEq("postId", postId))(user.likes)
      ? true
      : false;
  };
  const handleLike = () => dispatch(likePost(postId));
  const handleUnlike = () => dispatch(unlikePost(postId));

  const renderlikeButton = () => {
    return user.isAuthenticated ? (
      isPostLiked() ? (
        <ButtonWithTooltip tipTitle="Unlike" handleClick={handleUnlike}>
          <FavoriteIcon color="primary" />
        </ButtonWithTooltip>
      ) : (
        <ButtonWithTooltip tipTitle="Like" handleClick={handleLike}>
          <FavoriteBorder color="primary" />
        </ButtonWithTooltip>
      )
    ) : (
      <ButtonWithTooltip tipTitle="Like">
        <Link to="/login">
          <FavoriteBorder color="primary" />
        </Link>
      </ButtonWithTooltip>
    );
  };

  const renderDeleteButton = () => {
    return user.isAuthenticated && userHandle === user.credentials.handle ? (
      <DeletePost postId={postId} />
    ) : null;
  };
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
        {renderDeleteButton()}
        <Typography variant="body2" color="textSecondary">
          {dayjs(createdAt).fromNow()}
        </Typography>
        <Typography variant="body1">{body}</Typography>
        {renderlikeButton()}
        <span>{likeCount} Likes</span>
        <ButtonWithTooltip tipTitle="comments">
          <ChatIcon color="primary" />
        </ButtonWithTooltip>
        <span>{commentCount} Comments</span>
        <PostDialog postId={postId} userHandle={userHandle} />
      </CardContent>
    </Card>
  );
};

export default WithStyles(styles)(Post);
