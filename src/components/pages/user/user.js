import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
//Actions
import { getUserData } from "../../../redux/actions/dataActions";
//Components
import Post from "../../organisms/post/Post";
import StaticProfile from "../../organisms/staticProfile/StaticProfile";
import Grid from "@material-ui/core/Grid";
import {
  EMPTY_OBJECT_READONLY,
  EMPTY_STRING_READONLY
} from "../../../constants/emptyDefaults";
import PostSkeleton from "../../../utils/PostSkeleton";

const User = props => {
  const [postIdParam, setPostId] = useState(EMPTY_STRING_READONLY);
  const data = useSelector(store => store.data);
  const { profile, posts, loading } = data;
  const dispatch = useDispatch();

  const handle = props.match.params.handle;
  const postId = props.match.params.postId;

  useEffect(() => {
    dispatch(getUserData(handle));
    if (postId) setPostId(postId);
  }, []);

  const userPosts = loading ? (
    <PostSkeleton />
  ) : posts === EMPTY_OBJECT_READONLY ? (
    <p>This user has not post anything yet</p>
  ) : !postIdParam ? (
    posts.map(post => <Post key={post.postId} post={post} />)
  ) : (
    posts.map(post => {
      if (post.postId !== postIdParam) {
        return <Post key={post.postId} post={post} />;
      } else {
        return <Post key={post.postId} post={post} openDialog />;
      }
    })
  );
  return (
    <Grid container spacing={6}>
      <Grid item sm={8} xs={12}>
        {userPosts}
      </Grid>
      <Grid item sm={4} xs={12}>
        <StaticProfile profile={profile} />
      </Grid>
    </Grid>
  );
};

export default User;
