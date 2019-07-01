import "./App.css";
import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AppNavbar from "./components/layout/AppNavbar";
import Leaderboard from "./components/layout/Leaderboard";
import { Provider } from "react-redux";
import store from "./store";
import LogBoulder from "./components/boulders/LogBoulder";
import { ReactReduxFirebaseProvider } from "react-redux-firebase";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import { UserIsAuthenticated, UserIsNotAuthenticated } from "./helpers/auth";
import Profile from "./components/users/Profile";
import Footer from "./components/layout/Footer";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <AppNavbar />
          </div>
          <div className="container">
            <Switch>
              <Route
                exact
                path="/"
                component={UserIsAuthenticated(Leaderboard)}
              />
              <Route
                exact
                path="/logboulder"
                component={UserIsAuthenticated(LogBoulder)}
              />
              <Route
                exact
                path="/register"
                component={UserIsNotAuthenticated(Register)}
              />
              <Route
                exact
                path="/login"
                component={UserIsNotAuthenticated(Login)}
              />
              <Route
                exact
                path="/profile/:id"
                component={UserIsAuthenticated(Profile)}
              />
            </Switch>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
