import React, { useState } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";

//Service:
import { loginUser } from "../../services/loginService";

//Material UI:
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

//Styling using JSS:
const styles = {
  form: {
    textAlign: "center"
  },
  pageTitle: {
    margin: "10px auto"
  },
  textField: {
    margin: "10px auto"
  },
  button: {
    margin: "20px 0"
  }
};

let formFields = ["email", "password"];

const Login = props => {
  //Using hooks for state:
  const [form, setValues] = useState({
    email: "",
    password: ""
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({ email: "", password: "" });
  const redirectToHome = () => props.history.push("/");

  const handleSubmit = event => {
    event.preventDefault();
    setLoading(true);
    loginUser(form)
      .then(data => {
        setLoading(false);
        redirectToHome();
      })
      .catch(error => {
        setErrors({ ...error.response.data.errors });
      });
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
  let { classes } = props; //For the JSS styling

  return (
    <Grid container className={classes.form}>
      <Grid item sm />
      <Grid item sm>
        <Typography variant="h3" className={classes.pageTitle}>
          Login
        </Typography>
        <form onSubmit={handleSubmit}>
          {formFields.map(field => renderTextField(field))}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.button}
          >
            Login
          </Button>
        </form>
      </Grid>
      <Grid item sm />
    </Grid>
  );
};

Login.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Login);
