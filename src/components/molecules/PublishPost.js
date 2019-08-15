import React, { useState, Fragment } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import { useDispatch, useSelector } from "react-redux";
import { addPost } from "../../redux/actions/dataActions";
import { formStyles } from "../../styles/general";
import { EMPTY_STRING_READONLY } from "../../constants/emptyDefaults";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  CircularProgress
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import CloseIcon from "@material-ui/icons/Close";

import ButtonWithTooltip from "../atoms/ButtonWithTooltip";

const styles = formStyles;

const PublishPost = props => {
  const [open, setOpen] = useState(false);
  const [body, setBody] = useState(EMPTY_STRING_READONLY);
  const dispatch = useDispatch();
  const UI = useSelector(store => store.UI);
  const { loading, errors } = UI;
  const { classes } = props;

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleChange = event => setBody(event.target.value);
  const handleSubmit = event => {
    event.preventDefault();
    dispatch(addPost({ body: body }));
  };

  return (
    <Fragment>
      <ButtonWithTooltip tipTitle="Publish a Post" handleClick={handleOpen}>
        <AddIcon color="inherit" />
      </ButtonWithTooltip>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <ButtonWithTooltip
          tipTitle="Close"
          handleClick={handleClose}
          tipClass={classes.closeButton}
        >
          <CloseIcon />
        </ButtonWithTooltip>
        <DialogTitle>Publish a new Post</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <TextField
              name="body"
              type="text"
              label="Post"
              multiline
              rows="3"
              placeholder="Publish something interesting!"
              error={errors.body ? true : false}
              helperText={errors.body}
              onChange={handleChange}
              fullWidth
              className={classes.textField}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={loading}
              className={classes.submitButton}
            >
              Submit
              {loading && (
                <CircularProgress size={30} className={classes.progress} />
              )}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </Fragment>
  );
};

export default withStyles(styles)(PublishPost);
