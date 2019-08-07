import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import { fetchPosts } from "../../../services/postsService";
import Post from "../../organisms/post/Post";
import Profile from "../../organisms/profile/Profile";

import { connect } from "react-redux";

//FIXME: Set also as authorized route
class Home extends Component {
  state = {
    posts: null
  };

  componentDidMount() {
    fetchPosts().then(postsData => {
      this.setState({ posts: postsData });
    });
  }

  render() {
    let recentPosts =
      this.state.posts !== null ? (
        this.state.posts.map(post => <Post key={post.postId} post={post} />)
      ) : (
        <p>Loading...</p>
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
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.user.isAuthenticated
});
export default connect(mapStateToProps)(Home);
