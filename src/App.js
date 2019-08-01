import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";

//Pages:
import home from "./modules/home/home";
import login from "./modules/login/login";
import signup from "./modules/signup/signup";

//Molecule NavBar
import NavBar from "./components/molecules/NavBar";
import { teal } from "@material-ui/core/colors";
import { MuiThemeProvider } from "@material-ui/core";

const theme = createMuiTheme({
  palette: {
    primary: teal,
    secondary: {
      main: "#96000F"
    }
  }
});

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <div className="App">
        <h1>Barebones App </h1>

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
