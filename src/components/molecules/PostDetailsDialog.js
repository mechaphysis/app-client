import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";

// Redux and actions
import { useDispatch, useSelector } from "react-redux";
import { getPost } from "../../redux/actions/dataActions";

// Components
import ButtonWithTooltip from "../atoms/ButtonWithTooltip";
import Comments from "./Comments";

// Material UI
import Avatar from "@material-ui/core/Avatar";
import ChatIcon from "@material-ui/icons/Chat";
import DialogContent from "@material-ui/core/DialogContent";
import Dialog from "@material-ui/core/Dialog";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import CloseIcon from "@material-ui/icons/Close";
import UnfoldMore from "@material-ui/icons/UnfoldMore";
import withStyles from "@material-ui/core/styles/withStyles";

import dayjs from "dayjs";
import LikeButton from "../atoms/LikeButton";

const styles = {
  hiddenHR: {
    border: "none",
    margin: 4
  },
  visibleHR: {
    width: "100%",
    borderBottom: "1px solid rgba(0,0,0,0.1)",
    marginBottom: "20px"
  },
  bigAvatar: {
    margin: 10,
    width: 200,
    height: 200
  },
  closeButton: {
    position: "absolute",
    left: "90%"
  },
  dialogContent: {
    padding: 20
  },
  expandButton: {
    position: "absolute",
    right: "2.3%"
  },
  circularProgressContainer: {
    textAlign: "center",
    paddingTop: 50,
    paddingBottom: 50
  }
};

const PostDialog = props => {
  const [open, setOpen] = useState(false);

  const dispatch = useDispatch();
  const user = useSelector(store => store.user);
  const post = useSelector(store => store.data.post);
  const UI = useSelector(store => store.UI);

  const { classes, postId, userHandle, commentCount, likeCount } = props;

  const handleOpen = () => {
    dispatch(getPost(postId));
    setOpen(true);
  };
  const handleClose = () => setOpen(false);
  const renderContent = () => {
    return UI.loading ? (
      <Grid container>
        <Grid item sm={5} className={classes.circularProgressContainer}>
          <CircularProgress size={200} thickness={2} />
        </Grid>
      </Grid>
    ) : (
      <Grid container>
        <Grid item sm={5}>
          <Avatar
            alt={`Profile`}
            src={post.userImage}
            className={classes.bigAvatar}
          />
        </Grid>
        <Grid item sm={7}>
          <Typography
            component={Link}
            color="primary"
            variant="h5"
            to={`/users/${userHandle}`}
          >
            @{userHandle}
          </Typography>
          <hr className={classes.hiddenHR} />
          <Typography variant="body2" color="textSecondary">
            {dayjs(post.createdAt).format("h:mm a, MMMM DD YYYY")}
          </Typography>
          <hr className={classes.hiddenHR} />
          <Typography variant="body1">{post.body}</Typography>
          <LikeButton postId={postId} user={user} />
          <span>{likeCount} Likes</span>
          <ButtonWithTooltip tipTitle="comments">
            <ChatIcon color="primary" />
          </ButtonWithTooltip>
          <span>{commentCount} Comments</span>
        </Grid>
        <hr className={classes.visibleHR} />
        <Comments comments={post.comments} />
      </Grid>
    );
  };
  return (
    <Fragment>
      <ButtonWithTooltip
        handleClick={handleOpen}
        tipTitle="Watch Post Details"
        tipClass={classes.expandButton}
      >
        <UnfoldMore color="primary" />
      </ButtonWithTooltip>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <ButtonWithTooltip
          tipTitle="Close"
          handleClick={handleClose}
          tipClass={classes.closeButton}
        >
          <CloseIcon />
        </ButtonWithTooltip>
        <DialogContent className={classes.dialogContent}>
          {renderContent()}
        </DialogContent>
      </Dialog>
    </Fragment>
  );
};

export default withStyles(styles)(PostDialog);
