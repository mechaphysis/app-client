import React, { useState } from "react";
import { Link } from "react-router-dom";

//Redux
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../../redux/actions/userActions";

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

let formFields = ["email", "password"];

const Login = props => {
  // Connect to redux using hooks:
  const dispatch = useDispatch();
  const UI = useSelector(store => store.UI);

  //Using hooks for minimal state:
  const [form, setValues] = useState({
    email: "",
    password: ""
  });

  const handleSubmit = event => {
    event.preventDefault();
    dispatch(loginUser(form, props.history));
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
        type={fieldname}
        label={fieldname}
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
          Login
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
            Login
            {loading && (
              <CircularProgress size={30} className={classes.progress} />
            )}
          </Button>
          <Grid container>
            <Grid item className={classes.center}>
              <Typography variant="body2">
                Not registered yet?{" "}
                <Link to="/signup" variant="body2">
                  {"Sign Up"}
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

export default withStyles(styles)(Login);
