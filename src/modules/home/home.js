import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import { fetchPosts } from "../../services/postsService";
import Post from "../../components/Post";

class Home extends Component {
  state = {
    posts: null
  };
  componentDidMount() {
    fetchPosts().then(postsData => {
      this.setState({ posts: postsData });
      console.log("---> print postsData: ", postsData);
    });
  }
  render() {
    let recentPosts =
      this.state.posts !== null ? (
        this.state.posts.map(post => <Post post={post} />)
      ) : (
        <p>Loading...</p>
      );
    return (
      <Grid container spacing={6}>
        <Grid item sm={8} xs={12}>
          {recentPosts}
        </Grid>
        <Grid item sm={4} xs={12}>
          <p>Profile</p>
        </Grid>
      </Grid>
    );
  }
}

export default Home;
