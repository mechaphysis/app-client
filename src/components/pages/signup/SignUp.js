import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { includes } from "ramda";

//Service:
import { signUpUser } from "../../../redux/actions/userActions";

//Material UI:
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

//Styling using JSS:
import { formStyles } from "../../../styles/general";
const styles = formStyles;

let formFields = ["handle", "email", "password", "confirmPassword"];

const SignUp = props => {
  // connect to redux using hooks:
  const dispatch = useDispatch();
  const UI = useSelector(store => store.UI);

  //Using hooks for minimal state:
  const [form, setValues] = useState({
    handle: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const handleSubmit = event => {
    event.preventDefault();
    dispatch(signUpUser(form, props.history));
  };

  const handleChange = event => {
    setValues({
      ...form,
      [event.target.name]: event.target.value
    });
  };

  const renderTextField = fieldname => {
    return (
      <TextField
        key={fieldname}
        id={fieldname}
        name={fieldname}
        type={includes("confirm", fieldname) ? "password" : fieldname}
        label={includes("confirm", fieldname) ? "confirm password" : fieldname}
        className={classes.textField}
        value={form[fieldname]}
        helperText={errors[fieldname]}
        error={errors[fieldname] ? true : false}
        onChange={handleChange}
        fullWidth
      />
    );
  };

  const { classes } = props; //For the JSS styling

  const { loading, errors } = UI;

  const renderGeneralErrors = errors => {
    return errors.general ? (
      <Typography variant="body2" className={classes.customError}>
        {errors.general}
      </Typography>
    ) : null;
  };

  return (
    <Grid container className={classes.form}>
      <Grid item sm />
      <Grid item sm>
        <Typography variant="h3" className={classes.pageTitle}>
          Sign Up
        </Typography>
        <form onSubmit={handleSubmit}>
          {formFields.map(field => renderTextField(field))}
          {renderGeneralErrors(errors)}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={loading}
            className={classes.button}
          >
            Sign Up
            {loading && (
              <CircularProgress size={30} className={classes.progress} />
            )}
          </Button>
          <Grid container>
            <Grid item className={classes.center}>
              <Typography variant="body2">
                Already registered?{" "}
                <Link to="/login" variant="body2">
                  {"Sign In"}
                </Link>
              </Typography>
            </Grid>
          </Grid>
        </form>
      </Grid>
      <Grid item sm />
    </Grid>
  );
};

export default withStyles(styles)(SignUp);
