import React, { Component } from "react";
import { Link } from "react-router-dom";
import { compose } from "redux";
import { connect } from "react-redux";
import { firebaseConnect } from "react-redux-firebase";
import { firestoreConnect } from "react-redux-firebase";
import PropTypes from "prop-types";

class AppNavbar extends Component {
  state = {
    isAuthenticated: false
  };

  // static getDerivedStateFromProps(props, state) {
  //   const { auth } = props;

  //   if (auth.uid) {
  //     return { isAuthenticated: true };
  //   } else {
  //     return { isAuthenticated: false };
  //   }
  // }

  onLogoutclick = e => {
    e.preventDefault();

    const { firebase } = this.props;
    firebase.logout();
  };

  render() {
    const { isAuthenticated } = this.props;
    const { auth } = this.props;
    const { firebase } = this.props;

    if (isAuthenticated === true) {
      var userId = firebase.auth().currentUser.uid;
    }

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        // User logged in already or has just logged in.
        console.log(`The user with the ID ${user.uid} is currently logged in`);
      } else {
        // User not logged in or has just logged out.
        console.log("No user logged in or has just logged out");
      }
    });
    return (
      <div>
        <div className="navbar navbar-expand-md navbar-dark bg-primary mb-4">
          <div className="container">
            <Link to="/" className="navbar-brand">
              TickList
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarMain"
            >
              <span className="navbar-toggler-icon" />
            </button>
            <div className="collapse navbar-collapse" id="navbarMain">
              {auth.uid ? (
                <ul className="navbar-nav mr-auto">
                  <li className="nav-item">
                    <Link to="/" className="nav-link">
                      Leaderboard
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/logboulder" className="nav-link">
                      Log Boulder
                    </Link>
                  </li>
                </ul>
              ) : null}
              {!auth.uid ? (
                <ul className="navbar-nav ml-auto">
                  <li className="nav-item">
                    <Link to="/login" className="nav-link">
                      Login
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/register" className="nav-link">
                      Register
                    </Link>
                  </li>
                </ul>
              ) : null}
              {auth.uid ? (
                <ul className=" navbar-nav ml-auto">
                  <li className="nav-item">
                    <Link
                      to={`/profile/${firebase.auth().currentUser.uid}`}
                      className="nav-link"
                    >
                      Profile
                    </Link>
                  </li>
                  <li className="nav-item">
                    <a
                      href="!#"
                      className="nav-link"
                      onClick={this.onLogoutclick}
                    >
                      Logout
                    </a>
                  </li>
                </ul>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

AppNavbar.propTypes = {
  firebase: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

export default compose(
  firestoreConnect(),
  connect((state, props) => ({
    auth: state.firebase.auth
  }))
)(AppNavbar);
