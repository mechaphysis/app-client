import React from "react";
import DeletePost from "../molecules/DeletePostDialog";

const DeleteButton = props => {
  const { postId, user, userHandle } = props;

  return user.isAuthenticated && userHandle === user.credentials.handle ? (
    <DeletePost postId={postId} />
  ) : null;
};

export default DeleteButton;
