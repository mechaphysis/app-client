import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { submitComment } from "../../redux/actions/dataActions";

// Material UI:
import withStyles from "@material-ui/core/styles/withStyles";
import { formStyles } from "../../styles/general";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";

// Constants
import { EMPTY_STRING_READONLY } from "../../constants/emptyDefaults";

const styles = { ...formStyles };

const CommentForm = props => {
  const [body, setBody] = useState(EMPTY_STRING_READONLY);

  const { postId, classes } = props;

  const UI = useSelector(store => store.UI);
  const { errors } = UI;
  const isAuthenticated = useSelector(store => store.user.isAuthenticated);

  const dispatch = useDispatch();

  const handleChange = event => {
    setBody(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    dispatch(submitComment(postId, { body }));
  };

  const renderComment = () => {
    return isAuthenticated ? (
      <Grid item style={{ textAlign: "center" }}>
        <form onSubmit={handleSubmit}>
          <TextField
            name="body"
            type="text"
            label="Comment on Post"
            error={errors.comment ? true : false}
            helperText={errors.comment}
            value={body}
            onChange={handleChange}
            fullWidth
            className={classes.textField}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.submitButton}
          >
            Submit
          </Button>
        </form>
      </Grid>
    ) : null;
  };
  return renderComment();
};

export default withStyles(styles)(CommentForm);
