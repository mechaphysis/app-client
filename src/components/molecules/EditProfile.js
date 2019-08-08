import React, { useState, useEffect, Fragment } from "react";
import { PropTypes } from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import { connect } from "react-redux";
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
  const [form, setValues] = useState({
    bio: EMPTY_STRING_READONLY,
    website: EMPTY_STRING_READONLY,
    location: EMPTY_STRING_READONLY,
    open: false
  });

  //Deestructure props
  const { credentials, classes } = props;

  useEffect(() => {
    setValues({
      ...form,
      bio: credentials.bio ? credentials.bio : "",
      website: credentials.website ? credentials.website : "",
      location: credentials.location ? credentials.location : ""
    });
  }, [credentials.bio, credentials.website, credentials.location]);

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
    props.editUserDetails(userDetails);
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

EditProfile.propTypes = {
  editUserDetails: PropTypes.func.isRequired
  //add classes
};
const mapStateToProps = state => ({
  credentials: state.user.credentials
});
export default connect(
  mapStateToProps,
  { editUserDetails }
)(withStyles(styles)(EditProfile));
