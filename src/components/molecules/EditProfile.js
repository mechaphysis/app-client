import React, { useState, useEffect, Fragment } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import { useDispatch, useSelector } from "react-redux";
import { editUserDetails } from "../../redux/actions/userActions";

import { EMPTY_STRING_READONLY } from "../../constants/emptyDefaults";

import EditIcon from "@material-ui/icons/Edit";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button
} from "@material-ui/core";
import { map, pick } from "ramda";
import ButtonWithTooltip from "../atoms/ButtonWithTooltip";

const styles = {
  button: {
    float: "right"
  }
};

const EditProfile = props => {
  // connect to redux store using hooks:
  const dispatch = useDispatch();
  const credentials = useSelector(store => store.user.credentials);

  //Deestructure props
  const { classes } = props;

  const [form, setValues] = useState({
    bio: EMPTY_STRING_READONLY,
    website: EMPTY_STRING_READONLY,
    location: EMPTY_STRING_READONLY,
    open: false
  });

  /**
   * useEffect with and empty array as dependency (second argument)
   * behaves like componentDidMount()
   */
  useEffect(() => {
    setValues({
      ...form,
      bio: credentials.bio ? credentials.bio : "",
      website: credentials.website ? credentials.website : "",
      location: credentials.location ? credentials.location : ""
    });
  }, []);

  const handleOpenForm = () => {
    setValues({
      ...form,
      bio: credentials.bio ? credentials.bio : "",
      website: credentials.website ? credentials.website : "",
      location: credentials.location ? credentials.location : "",
      open: true
    });
  };

  const handleClose = () => {
    setValues({
      ...form,
      bio: credentials.bio ? credentials.bio : "",
      website: credentials.website ? credentials.website : "",
      location: credentials.location ? credentials.location : "",
      open: false
    });
  };
  const handleChange = event => {
    setValues({
      ...form,
      [event.target.name]: event.target.value
    });
  };

  let listOfFields = [
    { name: "bio", placeholder: "About yourself" },
    { name: "website", placeholder: "Your site" },
    { name: "location", placeholder: "Where do you live?" }
  ];

  const handleSubmit = () => {
    const userDetails = pick(["bio", "website", "location"], form);
    dispatch(editUserDetails(userDetails));
    handleClose();
  };

  const renderTextField = field => {
    return (
      <TextField
        name={field.name}
        key={field.name}
        type="text"
        label={field.name}
        multiline={field.name === "bio" ? true : false}
        placeholder={field.placeholder}
        rows="3"
        classes={classes.textField}
        value={form[field.name]}
        onChange={handleChange}
        fullWidth
      />
    );
  };
  return (
    <Fragment>
      <ButtonWithTooltip
        tipTitle="Edit details"
        handleClick={handleOpenForm}
        btnClass={classes.button}
      >
        <EditIcon color="primary" />
      </ButtonWithTooltip>
      <Dialog open={form.open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>Edit your details</DialogTitle>
        <DialogContent>
          <form>{map(renderTextField, listOfFields)}</form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};

export default withStyles(styles)(EditProfile);
