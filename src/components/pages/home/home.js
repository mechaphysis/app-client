import React, { useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import { getPosts } from "../../../redux/actions/dataActions";
import Post from "../../organisms/post/Post";
import Profile from "../../organisms/profile/Profile";

import { useSelector, useDispatch } from "react-redux";

const Home = () => {
  //Connect to Redux store using hooks
  const dispatch = useDispatch();
  const posts = useSelector(store => store.data.posts);
  const loading = useSelector(store => store.data.loading);

  useEffect(() => {
    dispatch(getPosts());
  }, []);

  let recentPosts = loading ? (
    <p>Loading...</p>
  ) : (
    posts.map(post => <Post key={post.postId} post={post} />)
  );

  return (
    <Grid container spacing={6}>
      <Grid item sm={8} xs={12}>
        {recentPosts}
      </Grid>
      <Grid item sm={4} xs={12}>
        <Profile />
      </Grid>
    </Grid>
  );
};

export default Home;
