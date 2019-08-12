import React, { Fragment, useState } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import ButtonWithTooltip from "../atoms/ButtonWithTooltip";
import { useDispatch } from "react-redux";

import { deletePost } from "../../redux/actions/dataActions";

//Material UI
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DeleteOutline from "@material-ui/icons/DeleteOutline";

const styles = {
  deleteButton: {
    position: "absolute",
    top: "10%",
    left: "90%"
  }
};
const DeletePost = props => {
  const [open, setOpen] = useState(false);

  const dispatch = useDispatch();

  const { classes, postId } = props;

  const handleOpen = () => {
    console.log("-- open clicked");
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const handleDeletePost = () => {
    dispatch(deletePost(postId));
    handleClose();
  };
  return (
    <Fragment>
      <ButtonWithTooltip
        tipTitle="Delete Post"
        handleClick={handleOpen}
        btnClass={classes.deleteButton}
      >
        <DeleteOutline color="secondary" />
      </ButtonWithTooltip>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>Are you sure do you want to delete the Post?</DialogTitle>
        <DialogActions>
          <Button color="primary" onClick={handleClose}>
            Cancel
          </Button>
          <Button color="secondary" onClick={handleDeletePost}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};

export default withStyles(styles)(DeletePost);
