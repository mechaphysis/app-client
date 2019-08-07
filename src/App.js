import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import customTheme from "./styles/theme";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
//Redux
import { Provider } from "react-redux";
import store from "./redux/store";

//Pages:
import home from "./components/pages/home/home";
import login from "./components/pages/login/Login";
import signup from "./components/pages/signup/SignUp";

//AuthRoute HOC:
import AuthRoute from "./components/templates/AuthRoute";
//Auth helpers:
import {
  isSessionExpired,
  setAuthorizationHeader,
  getUserAuthDetailsFromLS
} from "./utils/userAuth";

//actions:
import { logOutUser, getUserData } from "./redux/actions/userActions";
//types:
import { SET_AUTHENTICATED } from "./redux/actionTypes";

//Molecule NavBar
import NavBar from "./components/molecules/NavBar";
import { MuiThemeProvider } from "@material-ui/core";

const theme = createMuiTheme(customTheme);

const token = getUserAuthDetailsFromLS();
if (token) {
  if (isSessionExpired()) {
    store.dispatch(logOutUser());
    window.location.href = "/login";
  } else {
    store.dispatch({ type: SET_AUTHENTICATED });
    setAuthorizationHeader(token);
    store.dispatch(getUserData());
  }
}

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <Provider store={store}>
        <Router>
          <NavBar />
          <div className="container">
            <Switch>
              <Route exact path="/" component={home} />
              <AuthRoute exact path="/login" component={login} />
              <AuthRoute exact path="/signup" component={signup} />
            </Switch>
          </div>
        </Router>
      </Provider>
    </MuiThemeProvider>
  );
}

export default App;
