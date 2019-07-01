import React, { Component } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";

import PropTypes from "prop-types";
import Spinner from "../layout/Spinner";
import { Link } from "react-router-dom";
import { type } from "os";

import "./boulders.css";

class LoggedTableRow extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  componentDidMount() {
    const { onMount, id } = this.props;
    onMount(id);
    this.getTrys(id);
    this.getStars(id);
  }

  getStars = boulderId => {
    const { firebase } = this.props;
    var db = firebase.firestore();

    var match;
    var boulderIdsToCheck;

    var userId = firebase.auth().currentUser.uid;
    var userRef = db.collection("users").doc(userId);

    userRef.get().then(doc => {
      if (doc.exists) {
        boulderIdsToCheck = doc.data().completedBoulders;

        match = boulderIdsToCheck.find(boulder => boulder.id === boulderId);
        console.log(match);

        this.setState({ stars: match.stars }, function() {
          console.log(this.state.stars);
          rateBoulder(boulderId, this.state.stars);
        });
      }
    });
  };

  getTrys = boulderId => {
    const { firebase } = this.props;
    var db = firebase.firestore();

    var match;
    var boulderIdsToCheck;

    var userId = firebase.auth().currentUser.uid;
    var userRef = db.collection("users").doc(userId);

    userRef.get().then(doc => {
      if (doc.exists) {
        boulderIdsToCheck = doc.data().completedBoulders;

        match = boulderIdsToCheck.find(boulder => boulder.id === boulderId);
        console.log(match);

        this.setState({ trys: match.trys }, function() {
          console.log(this.state.trys);
        });
      }
    });
  };

  render() {
    const { id, holdColor, tape } = this.props;

    return (
      <tr key={id}>
        <td>{holdColor}</td>
        <td>{tape}</td>
        <td className="text-center">{this.state.trys}</td>
        <td>
          <div className="container" id={`starContainer${id}`} data-stars="0">
            <i className="far fa-star" id={`oneStar${id}`} />
            <i className="far fa-star" id={`twoStar${id}`} />
            <i className="far fa-star" id={`threeStar${id}`} />
            <i className="far fa-star" id={`fourStar${id}`} />
            <i className="far fa-star" id={`fiveStar${id}`} />
          </div>
        </td>
        <td>Ticked!</td>
      </tr>
    );
  }
}

class NotLoggedTableRow extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  componentDidMount() {
    const { onMount, id } = this.props;
    onMount(id);
  }
  render() {
    const { id, holdColor, tape, onClick } = this.props;
    return (
      <tr key={id}>
        <td>{holdColor}</td>
        <td>{tape}</td>
        <td className="text-center ">
          <div className="container mr-auto">
            <form action="select.html">
              <label>
                <select
                  className="custom-select form-control"
                  name="trys"
                  id={`numberOfTrys${id}`}
                >
                  <option>Flash!</option>
                  <option>2nd Go!</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                  <option>More than 5</option>
                </select>
              </label>
            </form>
          </div>
        </td>
        <td className="">
          <div className="container" id={`starContainer${id}`} data-stars="0">
            <i
              className="far fa-star"
              id={`oneStar${id}`}
              onClick={() => {
                rateBoulder(id, 1);
              }}
            />
            <i
              className="far fa-star"
              id={`twoStar${id}`}
              onClick={() => {
                rateBoulder(id, 2);
              }}
            />
            <i
              className="far fa-star"
              id={`threeStar${id}`}
              onClick={() => {
                rateBoulder(id, 3);
              }}
            />
            <i
              className="far fa-star"
              id={`fourStar${id}`}
              onClick={() => {
                rateBoulder(id, 4);
              }}
            />
            <i
              className="far fa-star"
              id={`fiveStar${id}`}
              onClick={() => {
                rateBoulder(id, 5);
              }}
            />
          </div>
        </td>
        <td>
          <button
            className="btn btn-secondary btn-sm bg-primary "
            style={{ cursor: "pointer" }}
            onClick={onClick}
          >
            <i className="fas fa-arrow-circle-right"> Tick!</i>
          </button>
        </td>
      </tr>
    );
  }
}

const rateBoulder = (boulderId, n) => {
  var numberOfStars = n;
  numberOfStars = parseInt(numberOfStars, 10);

  switch (numberOfStars) {
    case 0: {
      document.getElementById(`oneStar${boulderId}`).className = "far fa-star";
      document.getElementById(`twoStar${boulderId}`).className = "far fa-star";
      document.getElementById(`threeStar${boulderId}`).className =
        "far fa-star";
      document.getElementById(`fourStar${boulderId}`).className = "far fa-star";
      document.getElementById(`fiveStar${boulderId}`).className = "far fa-star";

      const numberOfStars = document.getElementById(
        `starContainer${boulderId}`
      );
      numberOfStars.dataset.stars = n;

      break;
    }
    case 1: {
      document.getElementById(`oneStar${boulderId}`).className = "fas fa-star";
      document.getElementById(`twoStar${boulderId}`).className = "far fa-star";
      document.getElementById(`threeStar${boulderId}`).className =
        "far fa-star";
      document.getElementById(`fourStar${boulderId}`).className = "far fa-star";
      document.getElementById(`fiveStar${boulderId}`).className = "far fa-star";

      const numberOfStars = document.getElementById(
        `starContainer${boulderId}`
      );
      numberOfStars.dataset.stars = n;

      break;
    }

    case 2: {
      document.getElementById(`oneStar${boulderId}`).className = "fas fa-star";
      document.getElementById(`twoStar${boulderId}`).className = "fas fa-star";
      document.getElementById(`threeStar${boulderId}`).className =
        "far fa-star";
      document.getElementById(`fourStar${boulderId}`).className = "far fa-star";
      document.getElementById(`fiveStar${boulderId}`).className = "far fa-star";
      const numberOfStars = document.getElementById(
        `starContainer${boulderId}`
      );
      numberOfStars.dataset.stars = n;

      break;
    }
    case 3: {
      document.getElementById(`oneStar${boulderId}`).className = "fas fa-star";
      document.getElementById(`twoStar${boulderId}`).className = "fas fa-star";
      document.getElementById(`threeStar${boulderId}`).className =
        "fas fa-star";
      document.getElementById(`fourStar${boulderId}`).className = "far fa-star";
      document.getElementById(`fiveStar${boulderId}`).className = "far fa-star";
      const numberOfStars = document.getElementById(
        `starContainer${boulderId}`
      );
      numberOfStars.dataset.stars = n;

      break;
    }
    case 4: {
      document.getElementById(`oneStar${boulderId}`).className = "fas fa-star";
      document.getElementById(`twoStar${boulderId}`).className = "fas fa-star";
      document.getElementById(`threeStar${boulderId}`).className =
        "fas fa-star";
      document.getElementById(`fourStar${boulderId}`).className = "fas fa-star";
      document.getElementById(`fiveStar${boulderId}`).className = "far fa-star";
      const numberOfStars = document.getElementById(
        `starContainer${boulderId}`
      );
      numberOfStars.dataset.stars = n;

      break;
    }
    case 5: {
      document.getElementById(`oneStar${boulderId}`).className = "fas fa-star";
      document.getElementById(`twoStar${boulderId}`).className = "fas fa-star";
      document.getElementById(`threeStar${boulderId}`).className =
        "fas fa-star";
      document.getElementById(`fourStar${boulderId}`).className = "fas fa-star";
      document.getElementById(`fiveStar${boulderId}`).className = "fas fa-star";
      const numberOfStars = document.getElementById(
        `starContainer${boulderId}`
      );
      numberOfStars.dataset.stars = n;

      break;
    }
  }
};

class TableRow extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLogged: false
    };

    this.isThisBoulderLoggedByTheUser = this.isThisBoulderLoggedByTheUser.bind(
      this
    );
  }

  isThisBoulderLoggedByTheUser = boulderId => {
    const { firebase } = this.props;
    var db = firebase.firestore();

    var match;
    var boulderIdsToCheck;

    var userId = firebase.auth().currentUser.uid;
    var userRef = db.collection("users").doc(userId);

    userRef.get().then(doc => {
      if (doc.exists) {
        boulderIdsToCheck = doc.data().completedBoulders;

        match = boulderIdsToCheck.find(boulder => boulder.id === boulderId);
      }
      if (typeof match !== "undefined") {
        if (match.id === boulderId) {
          this.setState({ isLogged: true }, function() {
            console.log(this.state.isLogged);
          });

          return true;
        }
      } else {
        this.setState({ isLogged: false }, function() {
          console.log(this.state.isLogged);
        });

        return false;
      }
    });
  };

  logBoulder = (boulderId, boulderTape) => {
    // Get the number of trys from the select
    const numberOfTrys = document.getElementById(`numberOfTrys${boulderId}`);
    const numberOfStars = document.getElementById(`starContainer${boulderId}`);
    var numStars = numberOfStars.dataset.stars;
    var numTrys = numberOfTrys.options[numberOfTrys.selectedIndex].value;

    // Get the number of star from the container

    // Add the boulder to completedBoulders of the user

    const firebase = this.props.firebase;

    var db = firebase.firestore();
    var userId = firebase.auth().currentUser.uid;

    var userRef = db.collection("users").doc(userId);

    const boulder = {
      id: boulderId,
      trys: numTrys,
      stars: numStars,
      tape: boulderTape
    };

    var match;
    var boulderIdsToCheck;

    userRef.get().then(doc => {
      if (doc.exists) {
        boulderIdsToCheck = doc.data().completedBoulders;

        match = boulderIdsToCheck.find(boulder => boulder.id === boulderId);
      }
      if (typeof match === "undefined" || match.id !== boulderId) {
        var setWithMerge = userRef
          .set(
            {
              completedBoulders: firebase.firestore.FieldValue.arrayUnion(
                boulder
              )
            },
            { merge: true }
          )
          .then(() => {
            userRef.update({
              tickedBoulders: firebase.firestore.FieldValue.increment(1)
            });
          });

        console.log(boulder);
      }
    });
  };

  toggleIsLogged = () => {
    this.setState({ isLogged: !this.state.isLogged }, function() {
      console.log(this.state.isLogged);
    });
    this.logBoulder(this.props.id, this.props.tape);
    this.isThisBoulderLoggedByTheUser(this.props.id);
  };

  render() {
    return (
      <React.Fragment>
        {this.state.isLogged ? (
          <LoggedTableRow
            holdColor={this.props.holdColor}
            tape={this.props.tape}
            onMount={this.isThisBoulderLoggedByTheUser}
            id={this.props.id}
            firebase={this.props.firebase}
          />
        ) : (
          <NotLoggedTableRow
            holdColor={this.props.holdColor}
            tape={this.props.tape}
            onClick={this.toggleIsLogged}
            onMount={this.isThisBoulderLoggedByTheUser}
            id={this.props.id}
          />
        )}
      </React.Fragment>
    );
  }
}

class Boulders1 extends Component {
  render() {
    const { boulders } = this.props;
    const { firebase } = this.props;
    const filterBoulders = (boulders, wallType, tape) => {
      var newBoulders = boulders.filter(boulder => boulder.wall === wallType);
      newBoulders = newBoulders.filter(boulder => boulder.tape === tape);

      return newBoulders;
    };

    if (boulders) {
      return (
        <section className="project-tab" id="tabs">
          <div className="container">
            <div className="col-md-12">
              <nav>
                <div className="nav nav-tabs nav-fill" id="nav-tab">
                  <a
                    className="nav-item nav-link active"
                    id="nav-affenzirkus-tab"
                    data-toggle="tab"
                    href="#nav-affenzirkus"
                    role="tab"
                    aria-controls="nav-affenzirkus"
                    aria-selected="true"
                  >
                    <h3>
                      <i className="fas fa-mountain"> Affenzirkus</i>
                    </h3>
                  </a>
                  <a
                    className="nav-item nav-link"
                    id="nav-dächer-tab"
                    data-toggle="tab"
                    href="#nav-dächer"
                    role="tab"
                    aria-controls="nav-dächer"
                    aria-selected="false"
                  >
                    <h3>
                      <i className="fas fa-mountain"> Dächer</i>
                    </h3>
                  </a>
                  <a
                    className="nav-item nav-link"
                    id="nav-pilz-tab"
                    data-toggle="tab"
                    href="#nav-pilz"
                    role="tab"
                    aria-controls="nav-pilz"
                    aria-selected="false"
                  >
                    <h3>
                      <i className="fas fa-mountain"> Pilz</i>
                    </h3>
                  </a>
                </div>
              </nav>

              <br />

              <div className="tab-content" id="nav-tabContent">
                <div
                  className="tab-pane fade show active"
                  id="nav-affenzirkus"
                  role="tabpanel"
                  aria-labelledby="nav-affenzirkus-tab"
                >
                  {/*Affenzirkus*/}

                  <table className="table">
                    <thead className="thead-inverse thead-light">
                      <tr>
                        <th>Hold Color</th>
                        <th>Tape</th>
                        <th className="text-center">Trys</th>
                        <th>Rate The Boulder</th>
                        <th />
                      </tr>
                    </thead>
                    <tbody>
                      {filterBoulders(boulders, "Affenzirkus", "Yellow").map(
                        boulder => (
                          <TableRow
                            holdColor={boulder.holdColor}
                            tape={boulder.tape}
                            id={boulder.id}
                            firebase={firebase}
                          />
                        )
                      )}
                      {filterBoulders(boulders, "Affenzirkus", "Green").map(
                        boulder => (
                          <TableRow
                            holdColor={boulder.holdColor}
                            tape={boulder.tape}
                            id={boulder.id}
                            firebase={firebase}
                          />
                        )
                      )}
                      {filterBoulders(boulders, "Affenzirkus", "Blue").map(
                        boulder => (
                          <TableRow
                            holdColor={boulder.holdColor}
                            tape={boulder.tape}
                            id={boulder.id}
                            firebase={firebase}
                          />
                        )
                      )}
                      {filterBoulders(boulders, "Affenzirkus", "Red").map(
                        boulder => (
                          <TableRow
                            holdColor={boulder.holdColor}
                            tape={boulder.tape}
                            id={boulder.id}
                            firebase={firebase}
                          />
                        )
                      )}
                      {filterBoulders(boulders, "Affenzirkus", "Black").map(
                        boulder => (
                          <TableRow
                            holdColor={boulder.holdColor}
                            tape={boulder.tape}
                            id={boulder.id}
                            firebase={firebase}
                          />
                        )
                      )}
                    </tbody>
                  </table>
                </div>

                <div
                  className="tab-pane fade"
                  id="nav-dächer"
                  role="tabpanel"
                  aria-labelledby="nav-dächer-tab"
                >
                  {/*Dächer*/}

                  <table className="table">
                    <thead className="thead-inverese thead-light">
                      <tr>
                        <th>Hold Color</th>
                        <th>Tape</th>
                        <th className="text-center">Trys</th>
                        <th>Rate The Boulder</th>
                        <th />
                      </tr>
                    </thead>
                    <tbody>
                      {filterBoulders(boulders, "Dächer", "Yellow").map(
                        boulder => (
                          <TableRow
                            holdColor={boulder.holdColor}
                            tape={boulder.tape}
                            id={boulder.id}
                            firebase={firebase}
                          />
                        )
                      )}
                      {filterBoulders(boulders, "Dächer", "Green").map(
                        boulder => (
                          <TableRow
                            holdColor={boulder.holdColor}
                            tape={boulder.tape}
                            id={boulder.id}
                            firebase={firebase}
                          />
                        )
                      )}
                      {filterBoulders(boulders, "Dächer", "Blue").map(
                        boulder => (
                          <TableRow
                            holdColor={boulder.holdColor}
                            tape={boulder.tape}
                            id={boulder.id}
                            firebase={firebase}
                          />
                        )
                      )}
                      {filterBoulders(boulders, "Dächer", "Red").map(
                        boulder => (
                          <TableRow
                            holdColor={boulder.holdColor}
                            tape={boulder.tape}
                            id={boulder.id}
                            firebase={firebase}
                          />
                        )
                      )}
                      {filterBoulders(boulders, "Dächer", "Black").map(
                        boulder => (
                          <TableRow
                            holdColor={boulder.holdColor}
                            tape={boulder.tape}
                            id={boulder.id}
                            firebase={firebase}
                          />
                        )
                      )}
                    </tbody>
                  </table>
                </div>

                <div
                  className="tab-pane fade"
                  id="nav-pilz"
                  role="tabpanel"
                  aria-labelledby="nav-pilz-tab"
                >
                  {/*Pilz*/}

                  <table className="table">
                    <thead className="thead-inverese thead-light">
                      <tr>
                        <th>Hold Color</th>
                        <th>Tape</th>
                        <th className="text-center">Trys </th>
                        <th>Rate The Boulder</th>
                        <th />
                      </tr>
                    </thead>
                    <tbody>
                      {filterBoulders(boulders, "Pilz", "Yellow").map(
                        boulder => (
                          <TableRow
                            holdColor={boulder.holdColor}
                            tape={boulder.tape}
                            id={boulder.id}
                            firebase={firebase}
                          />
                        )
                      )}
                      {filterBoulders(boulders, "Pilz", "Green").map(
                        boulder => (
                          <TableRow
                            holdColor={boulder.holdColor}
                            tape={boulder.tape}
                            id={boulder.id}
                            firebase={firebase}
                          />
                        )
                      )}
                      {filterBoulders(boulders, "Pilz", "Blue").map(boulder => (
                        <TableRow
                          holdColor={boulder.holdColor}
                          tape={boulder.tape}
                          id={boulder.id}
                          firebase={firebase}
                        />
                      ))}
                      {filterBoulders(boulders, "Pilz", "Red").map(boulder => (
                        <TableRow
                          holdColor={boulder.holdColor}
                          tape={boulder.tape}
                          id={boulder.id}
                          firebase={firebase}
                        />
                      ))}
                      {filterBoulders(boulders, "Pilz", "Black").map(
                        boulder => (
                          <TableRow
                            holdColor={boulder.holdColor}
                            tape={boulder.tape}
                            id={boulder.id}
                            firebase={firebase}
                          />
                        )
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </section>
      );
    } else {
      return <Spinner />;
    }
  }
}

Boulders1.propTypes = {
  firebase: PropTypes.object.isRequired,
  firestore: PropTypes.object.isRequired,
  boulders: PropTypes.array,
  users: PropTypes.array
};

export default compose(
  firestoreConnect([{ collection: "boulders" }], [{ collection: "users" }]),
  connect((state, props) => ({
    boulders: state.firestore.ordered.boulders,
    users: state.firestore.ordered.users
  }))
)(Boulders1);
