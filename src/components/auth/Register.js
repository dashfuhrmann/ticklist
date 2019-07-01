import React, { Component } from "react";
import PropTypes from "prop-types";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { firebaseConnect } from "react-redux-firebase";
import { notifyUser } from "../../actions/notifyActions";
import Alert from "../layout/Alert";
import ReactDOM from "react-dom";
// import { notifyUser } from "../../actions/notifyActions";
// import Alert from "../layout/Alert";

class Register extends Component {
  state = {
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    displayName: "",
    tickedBoulders: "0"
  };

  componentWillUnmount() {
    const { notifyUser } = this.props;
    console.log("Register unmounted");
    notifyUser("", "null");
  }

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  onSubmit = e => {
    e.preventDefault();

    const { firebase, notifyUser } = this.props;
    const { firestore } = this.props;
    const { email, password, displayName, firstName, lastName } = this.state;

    firebase
      .createUser({
        email,
        password
      })
      .then(() => {
        var db = firebase.firestore();
        var userId = firebase.auth().currentUser.uid;

        db.collection("users")
          .doc(userId)
          .set({
            username: displayName,
            email: email,
            tickedBoulders: "0",
            completedBoulders: [],
            firstName: firstName,
            lastName: lastName
          });
      });
    // .catch(err => notifyUser("That User Already Exists", "error"));
  };

  render() {
    const { message, messageType } = this.props.notify;
    return (
      <div className="row">
        <div className="col-md-6 mx-auto">
          <div className="card">
            <div className="card-body">
              {message ? (
                <Alert message={message} messageType={messageType} />
              ) : null}
              <h1 className="text-center pb-4 pt-3">
                <span className="text-primary">
                  <i className="fas fa-lock" /> Register
                </span>
              </h1>
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="text"
                    className="form-control"
                    name="email"
                    required
                    value={this.state.email}
                    onChange={this.onChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="firstName">First Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="firstName"
                    required
                    value={this.state.firstName}
                    onChange={this.onChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="lastName">Last Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="lastName"
                    required
                    value={this.state.lastName}
                    onChange={this.onChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="displayName">Username</label>
                  <input
                    type="text"
                    className="form-control"
                    name="displayName"
                    required
                    value={this.state.displayName}
                    onChange={this.onChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    name="password"
                    required
                    value={this.state.password}
                    onChange={this.onChange}
                  />
                </div>
                <input
                  type="submit"
                  value="Register"
                  className="btn btn-primary btn-block"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Register.propTypes = {
  firebase: PropTypes.object.isRequired,
  notify: PropTypes.object.isRequired,
  notifyUser: PropTypes.func.isRequired
};

export default compose(
  firestoreConnect(),
  connect(
    (state, props) => ({
      notify: state.notify
    }),
    { notifyUser }
  )
)(Register);
