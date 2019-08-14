import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
// redux actions
import { likePost, unlikePost } from "../../redux/actions/dataActions";
//helpers
import { isPostLiked } from "../../helpers/postHelpers";
//components:
import ButtonWithTooltip from "../atoms/ButtonWithTooltip";

//Material UI
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";

const LikeButton = props => {
  const { postId, user } = props;
  const dispatch = useDispatch();
  const handleLike = () => dispatch(likePost(postId));
  const handleUnlike = () => dispatch(unlikePost(postId));

  return user.isAuthenticated ? (
    isPostLiked(user, postId) ? (
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

export default LikeButton;
