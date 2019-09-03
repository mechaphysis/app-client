import React, { Fragment } from "react";
import NoImage from "../assets/no-image.png";

// Material UI
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import withStyles from "@material-ui/core/styles/withStyles";

import { EMPTY_OBJECT_READONLY } from "../constants/emptyDefaults";
import { palette } from "@material-ui/system";

const styles = {
  card: {
    display: "flex",
    marginBottom: 20
  },
  cardContent: {
    width: "100%",
    flexDirection: "column",
    padding: 25
  },
  cover: {
    minWidth: 200,
    objectFit: "cover"
  },
  handle: {
    width: 60,
    height: 20,
    backgroundColor: "#009688",
    marginBottom: 7
  }
};

const PostSkeleton = props => {
  const { classes } = props;

  const content = Array.from({ length: 5 }).map((element, index) => (
    <Card className={classes.card} key={index}>
      <CardMedia className={classes.cover} image={NoImage} />
      <CardContent className={classes.cardContent}>
        <div className={classes.handle} />
        <div className={classes.date} />
        <div className={classes.fullLine} />
        <div className={classes.fullLine} />
        <div className={classes.halfLine} />
      </CardContent>
    </Card>
  ));
  return <Fragment> {content}</Fragment>;
};

export default withStyles(styles)(PostSkeleton);
