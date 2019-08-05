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

//Molecule NavBar
import NavBar from "./components/molecules/NavBar";
import { MuiThemeProvider } from "@material-ui/core";

const theme = createMuiTheme(customTheme);

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
