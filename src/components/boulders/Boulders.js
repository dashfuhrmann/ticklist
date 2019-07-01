import React, { Component } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";

import PropTypes from "prop-types";
import Spinner from "../layout/Spinner";
import { Link } from "react-router-dom";

class Boulders extends Component {
  logBoulder = (boulderId, boulderTape) => {
    // Get the number of trys from the select
    const numberOfTrys = document.getElementById(`numberOfTrys${boulderId}`);
    const numberOfStars = document.getElementById(`starContainer${boulderId}`);
    var numStars = numberOfStars.dataset.stars;
    var numTrys = numberOfTrys.options[numberOfTrys.selectedIndex].value;

    // Get the number of star from the container

    // Add the boulder to completedBoulders of the user

    const { firebase } = this.props;

    var db = firebase.firestore();
    var userId = firebase.auth().currentUser.uid;

    var userRef = db.collection("users").doc(userId);

    const boulder = {
      id: boulderId,
      trys: numTrys,
      stars: numStars,
      tape: boulderTape
    };

    var setWithMerge = userRef
      .set(
        {
          completedBoulders: firebase.firestore.FieldValue.arrayUnion(boulder)
        },
        { merge: true }
      )
      .then(() => {
        userRef.update({
          tickedBoulders: firebase.firestore.FieldValue.increment(1)
        });
      });
    var button;
    button = document.getElementById(`logButton${boulderId}`);
    button.style.display = "none";
  };

  rateBoulder = (boulderId, n) => {
    switch (n) {
      case 1: {
        document.getElementById(`oneStar${boulderId}`).className =
          "fas fa-star";
        document.getElementById(`twoStar${boulderId}`).className =
          "far fa-star";
        document.getElementById(`threeStar${boulderId}`).className =
          "far fa-star";
        document.getElementById(`fourStar${boulderId}`).className =
          "far fa-star";
        document.getElementById(`fiveStar${boulderId}`).className =
          "far fa-star";

        const numberOfStars = document.getElementById(
          `starContainer${boulderId}`
        );
        numberOfStars.dataset.stars = n;

        break;
      }

      case 2: {
        document.getElementById(`oneStar${boulderId}`).className =
          "fas fa-star";
        document.getElementById(`twoStar${boulderId}`).className =
          "fas fa-star";
        document.getElementById(`threeStar${boulderId}`).className =
          "far fa-star";
        document.getElementById(`fourStar${boulderId}`).className =
          "far fa-star";
        document.getElementById(`fiveStar${boulderId}`).className =
          "far fa-star";
        const numberOfStars = document.getElementById(
          `starContainer${boulderId}`
        );
        numberOfStars.dataset.stars = n;

        break;
      }
      case 3: {
        document.getElementById(`oneStar${boulderId}`).className =
          "fas fa-star";
        document.getElementById(`twoStar${boulderId}`).className =
          "fas fa-star";
        document.getElementById(`threeStar${boulderId}`).className =
          "fas fa-star";
        document.getElementById(`fourStar${boulderId}`).className =
          "far fa-star";
        document.getElementById(`fiveStar${boulderId}`).className =
          "far fa-star";
        const numberOfStars = document.getElementById(
          `starContainer${boulderId}`
        );
        numberOfStars.dataset.stars = n;

        break;
      }
      case 4: {
        document.getElementById(`oneStar${boulderId}`).className =
          "fas fa-star";
        document.getElementById(`twoStar${boulderId}`).className =
          "fas fa-star";
        document.getElementById(`threeStar${boulderId}`).className =
          "fas fa-star";
        document.getElementById(`fourStar${boulderId}`).className =
          "fas fa-star";
        document.getElementById(`fiveStar${boulderId}`).className =
          "far fa-star";
        const numberOfStars = document.getElementById(
          `starContainer${boulderId}`
        );
        numberOfStars.dataset.stars = n;

        break;
      }
      case 5: {
        document.getElementById(`oneStar${boulderId}`).className =
          "fas fa-star";
        document.getElementById(`twoStar${boulderId}`).className =
          "fas fa-star";
        document.getElementById(`threeStar${boulderId}`).className =
          "fas fa-star";
        document.getElementById(`fourStar${boulderId}`).className =
          "fas fa-star";
        document.getElementById(`fiveStar${boulderId}`).className =
          "fas fa-star";
        const numberOfStars = document.getElementById(
          `starContainer${boulderId}`
        );
        numberOfStars.dataset.stars = n;

        break;
      }
    }
  };

  isThisBoulderLoggedByTheUser = boulderId => {
    var button;
    var match;
    var boulderIdsToCheck;
    const { firebase } = this.props;
    var db = firebase.firestore();
    var userId = firebase.auth().currentUser.uid;
    var userRef = db.collection("users").doc(userId);

    userRef.get().then(function(doc) {
      if (doc.exists) {
        boulderIdsToCheck = doc.data().completedBoulders;

        match = boulderIdsToCheck.find(boulder => boulder.id === boulderId);
      }
      if (typeof match !== "undefined") {
        if (match.id === boulderId) {
          button = document.getElementById(`logButton${boulderId}`);
          button.style.display = "none";
        }
      }
    });
  };

  // isBoulderLogged = boulderId => {
  //   let isNotLogged = true;
  //   var boulderIdsToCheck;
  //   const { firebase } = this.props;
  //   var db = firebase.firestore();
  //   var userId = firebase.auth().currentUser.uid;
  //   var userRef = db.collection("users").doc(userId);

  //   userRef.get().then(function(doc) {
  //     if (doc.exists) {
  //       boulderIdsToCheck = doc.data().completedBoulders;
  //       console.log(boulderIdsToCheck);
  //     }
  //     const match = boulderIdsToCheck.find(boulder => (boulder.id = boulderId));
  //     console.log(match);
  //     if (match !== "undefined" && match !== null && match.exists) {
  //       isNotLogged = false;
  //     }
  //   });
  //   return isNotLogged;
  // };

  render() {
    const filterBoulders = (boulders, wallType) => {
      const newBoulders = boulders.filter(boulder => boulder.wall === wallType);

      return newBoulders;
    };

    const { boulders } = this.props;

    if (boulders) {
      return (
        <div>
          <div className="row">
            <div className="col-md-6">
              <h2>
                <i className="fas fa-mountain"> Pilz</i>
              </h2>
            </div>
          </div>
          <table className="table ">
            <thead className="thead-inverese thead-light">
              <tr>
                <th>Hold Color</th>
                <th>Tape</th>
                <th>Trys</th>
                <th>Rate The Boulder</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {filterBoulders(boulders, "Pilz").map(boulder => (
                <tr key={boulder.id}>
                  <td width="25%">{boulder.holdColor}</td>
                  <td width="25%">{boulder.tape}</td>
                  <td>
                    <div className="container mr-auto">
                      <form action="select.html">
                        <label>
                          <select
                            className="custom-select form-control"
                            name="trys"
                            id={`numberOfTrys${boulder.id}`}
                          >
                            <option value="1">Flash!</option>
                            <option value="2">2nd Go!</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">More than 5</option>
                          </select>
                        </label>
                      </form>
                    </div>
                  </td>
                  <td>
                    <div
                      className="container"
                      id={`starContainer${boulder.id}`}
                      data-stars="0"
                    >
                      <i
                        className="far fa-star"
                        id={`oneStar${boulder.id}`}
                        onClick={() => {
                          this.rateBoulder(boulder.id, 1);
                        }}
                      />
                      <i
                        className="far fa-star"
                        id={`twoStar${boulder.id}`}
                        onClick={() => {
                          this.rateBoulder(boulder.id, 2);
                        }}
                      />
                      <i
                        className="far fa-star"
                        id={`threeStar${boulder.id}`}
                        onClick={() => {
                          this.rateBoulder(boulder.id, 3);
                        }}
                      />
                      <i
                        className="far fa-star"
                        id={`fourStar${boulder.id}`}
                        onClick={() => {
                          this.rateBoulder(boulder.id, 4);
                        }}
                      />
                      <i
                        className="far fa-star"
                        id={`fiveStar${boulder.id}`}
                        onClick={() => {
                          this.rateBoulder(boulder.id, 5);
                        }}
                      />
                    </div>
                  </td>
                  <td>
                    <button
                      onChange={this.isThisBoulderLoggedByTheUser(boulder.id)}
                      id={`logButton${boulder.id}`}
                      className="btn btn-secondary btn-sm bg-primary "
                      onClick={() => {
                        this.logBoulder(boulder.id, boulder.tape);
                      }}
                      style={{ cursor: "pointer" }}
                    >
                      <i className="fas fa-arrow-circle-right "> Log!</i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <br />
          <br />
          <div className="row">
            <div className="col-md-6">
              <h2>
                <i className="fas fa-mountain"> Dächer</i>
              </h2>
            </div>
          </div>
          <table className="table">
            <thead className="thead-inverese thead-light">
              <tr>
                <th>Hold Color</th>
                <th>Tape</th>
                <th>Trys</th>
                <th>Rate The Boulder</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {filterBoulders(boulders, "Dächer").map(boulder => (
                <tr key={boulder.id}>
                  <td width="25%">{boulder.holdColor}</td>
                  <td width="25%">{boulder.tape}</td>
                  <td>
                    <div className="container mr-auto">
                      <form action="select.html">
                        <label>
                          <select
                            className="custom-select form-control"
                            name="trys"
                            id={`numberOfTrys${boulder.id}`}
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
                  <td>
                    <div
                      className="container"
                      id={`starContainer${boulder.id}`}
                      data-stars="0"
                    >
                      <i
                        className="far fa-star"
                        id={`oneStar${boulder.id}`}
                        onClick={() => {
                          this.rateBoulder(boulder.id, 1);
                        }}
                      />
                      <i
                        className="far fa-star"
                        id={`twoStar${boulder.id}`}
                        onClick={() => {
                          this.rateBoulder(boulder.id, 2);
                        }}
                      />
                      <i
                        className="far fa-star"
                        id={`threeStar${boulder.id}`}
                        onClick={() => {
                          this.rateBoulder(boulder.id, 3);
                        }}
                      />
                      <i
                        className="far fa-star"
                        id={`fourStar${boulder.id}`}
                        onClick={() => {
                          this.rateBoulder(boulder.id, 4);
                        }}
                      />
                      <i
                        className="far fa-star"
                        id={`fiveStar${boulder.id}`}
                        onClick={() => {
                          this.rateBoulder(boulder.id, 5);
                        }}
                      />
                    </div>
                  </td>
                  <td>
                    <button
                      id={`logButton${boulder.id}`}
                      onChange={this.isThisBoulderLoggedByTheUser(boulder.id)}
                      className="btn btn-secondary btn-sm bg-primary"
                      onClick={() => {
                        this.logBoulder(boulder.id, boulder.tape);
                      }}
                      style={{ cursor: "pointer" }}
                    >
                      <i className="fas fa-arrow-circle-right "> Log!</i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <br />
          <br />
          <div className="row">
            <div className="col-md-6">
              <h2>
                <i className="fas fa-mountain"> Affenzirkus</i>
              </h2>
            </div>
          </div>
          <table className="table">
            <thead className="thead-inverese thead-light">
              <tr>
                <th>Hold Color</th>
                <th>Tape</th>
                <th>Trys</th>
                <th>Rate The Boulder</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {filterBoulders(boulders, "Affenzirkus").map(boulder => (
                <tr key={boulder.id}>
                  <td width="25%">{boulder.holdColor}</td>
                  <td width="25%">{boulder.tape}</td>
                  <td>
                    <div className="container mr-auto">
                      <form action="select.html">
                        <label>
                          <select
                            className="custom-select form-control"
                            name="trys"
                            id={`numberOfTrys${boulder.id}`}
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
                  <td>
                    <div
                      className="container"
                      id={`starContainer${boulder.id}`}
                      data-stars="0"
                    >
                      <i
                        className="far fa-star"
                        id={`oneStar${boulder.id}`}
                        onClick={() => {
                          this.rateBoulder(boulder.id, 1);
                        }}
                      />
                      <i
                        className="far fa-star"
                        id={`twoStar${boulder.id}`}
                        onClick={() => {
                          this.rateBoulder(boulder.id, 2);
                        }}
                      />
                      <i
                        className="far fa-star"
                        id={`threeStar${boulder.id}`}
                        onClick={() => {
                          this.rateBoulder(boulder.id, 3);
                        }}
                      />
                      <i
                        className="far fa-star"
                        id={`fourStar${boulder.id}`}
                        onClick={() => {
                          this.rateBoulder(boulder.id, 4);
                        }}
                      />
                      <i
                        className="far fa-star"
                        id={`fiveStar${boulder.id}`}
                        onClick={() => {
                          this.rateBoulder(boulder.id, 5);
                        }}
                      />
                    </div>
                  </td>
                  <td>
                    <button
                      id={`logButton${boulder.id}`}
                      onChange={this.isThisBoulderLoggedByTheUser(boulder.id)}
                      className="btn btn-secondary btn-sm bg-primary"
                      onClick={() => {
                        this.logBoulder(boulder.id, boulder.tape);
                      }}
                      style={{ cursor: "pointer" }}
                    >
                      <i className="fas fa-arrow-circle-right "> Log!</i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    } else {
      return <Spinner />;
    }
  }
}

Boulders.propTypes = {
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
)(Boulders);
