import { find, propEq } from "ramda";

export const isPostLiked = (user, postId) => {
  return user.likes && find(propEq("postId", postId))(user.likes)
    ? true
    : false;
};
