import React from "react";
import { map } from "ramda";

//Components:
import Comment from "./Comment";
// Material UI
import Grid from "@material-ui/core/Grid";

const Comments = props => {
  const { comments, classes } = props;
  const renderComment = comment => {
    const { body, createdAt, userImage, userHandle } = comment;
    return (
      <Comment
        body={body}
        key={createdAt}
        createdAt={createdAt}
        userImage={userImage}
        userHandle={userHandle}
        classes={classes}
      />
    );
  };
  return <Grid container>{map(renderComment, comments)}</Grid>;
};

export default Comments;
