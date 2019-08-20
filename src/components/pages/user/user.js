import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
//Actions
import { getUserData } from "../../../redux/actions/userActions";
//Components
import Post from "../../organisms/post/Post";
import StaticProfile from "../../organisms/staticProfile/StaticProfile";
import Grid from "@material-ui/core/Grid";
import { EMPTY_OBJECT_READONLY } from "../../../constants/emptyDefaults";

const User = props => {
  const data = useSelector(store => store.data);
  const { profile, posts, loading } = data;
  const dispatch = useDispatch();

  const handle = props.match.params.handle;

  useEffect(() => {
    dispatch(getUserData(handle));
  }, []);

  const userPosts = loading ? (
    <p>loading data...</p>
  ) : posts === EMPTY_OBJECT_READONLY ? (
    <p>This user has not post anything yet</p>
  ) : (
    posts.map(post => <Post key={post.postId} post={post} />)
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
