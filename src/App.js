import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import customTheme from "./styles/theme";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";

//Pages:
import home from "./modules/home/home";
import login from "./modules/login/Login";
import signup from "./modules/signup/SignUp";

//Molecule NavBar
import NavBar from "./components/molecules/NavBar";
import { MuiThemeProvider } from "@material-ui/core";

const theme = createMuiTheme(customTheme);

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <div className="App">
        <Router>
          <NavBar />
          <div className="container">
            <Switch>
              <Route exact path="/" component={home} />
              <Route exact path="/login" component={login} />
              <Route exact path="/signup" component={signup} />
            </Switch>
          </div>
        </Router>
      </div>
    </MuiThemeProvider>
  );
}

export default App;
