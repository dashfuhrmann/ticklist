import React, { Component } from "react";
import { Chart } from "chart.js";
import examplepic from "../../IMG_5405.png";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { firebaseConnect } from "react-redux-firebase";
import { compose } from "redux";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";

import { firestoreConnect } from "react-redux-firebase";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.ref1 = React.createRef();
    this.ref2 = React.createRef();

    this.renderEmptyChart = this.renderEmptyChart.bind(this);
    this.renderPaintedChart = this.renderPaintedChart.bind(this);

    this.state = {
      overallBoulders: 0,
      levelOneBoulders: 0,
      levelTwoBoulders: 0,
      levelThreeBoulders: 0,
      levelFourBoulders: 0,
      levelFiveBoulders: 0,
      levelOneCompletedBoulders: 0,
      levelTwoCompletedBoulders: 0,
      levelThreeCompletedBoulders: 0,
      levelFourCompletedBoulders: 0,
      levelFiveCompletedBoulders: 0,
      completedBouldersIsEmpty: true,
      user: {}
    };
  }

  componentWillMount() {
    const { firebase } = this.props;
    const { id } = this.props.match.params;

    var db = firebase.firestore();

    db.collection("boulders")
      .get()
      .then(snapshot => {
        snapshot.docs.forEach(doc => {
          this.setState(
            { overallBoulders: this.state.overallBoulders + 1 },
            function() {
              console.log(this.state.overallBoulders);
            }
          );

          switch (doc.data().tape) {
            case "Yellow":
              this.setState(
                { levelOneBoulders: this.state.levelOneBoulders + 1 },
                function() {
                  console.log(this.state.levelOneBoulders);
                }
              );

              break;
            case "Green":
              this.setState(
                { levelTwoBoulders: this.state.levelTwoBoulders + 1 },
                function() {
                  console.log(this.state.levelTwoBoulders);
                }
              );
              break;
            case "Blue":
              this.setState(
                { levelThreeBoulders: this.state.levelThreeBoulders + 1 },
                function() {
                  console.log(this.state.levelThreeBoulders);
                }
              );
              break;
            case "Red":
              this.setState(
                { levelFourBoulders: this.state.levelFourBoulders + 1 },
                function() {
                  console.log(this.state.levelFourBoulders);
                }
              );
              break;
            case "Black":
              this.setState(
                { levelFiveBoulders: this.state.levelFiveBoulders + 1 },
                function() {
                  console.log(this.state.levelFiveBoulders);
                }
              );
              break;
          }
        });
      });

    var boulderIdsToCheck;
    var userRef = db.collection("users").doc(id);

    userRef.get().then(doc => {
      if (doc.exists) {
        boulderIdsToCheck = doc.data().completedBoulders;
        boulderIdsToCheck.forEach(doc => {
          switch (doc.tape) {
            case "Yellow":
              this.setState(
                {
                  levelOneCompletedBoulders:
                    this.state.levelOneCompletedBoulders + 1
                },
                function() {
                  console.log(this.state.levelOneCompletedBoulders);
                }
              );
              break;
            case "Green":
              this.setState(
                {
                  levelTwoCompletedBoulders:
                    this.state.levelTwoCompletedBoulders + 1
                },
                function() {
                  console.log(this.state.levelTwoCompletedBoulders);
                }
              );
              break;
            case "Blue":
              this.setState(
                {
                  levelThreeCompletedBoulders:
                    this.state.levelThreeCompletedBoulders + 1
                },
                function() {
                  console.log(this.state.levelThreeCompletedBoulders);
                }
              );
              break;
            case "Red":
              this.setState(
                {
                  levelFourCompletedBoulders:
                    this.state.levelFourCompletedBoulders + 1
                },
                function() {
                  console.log(this.state.levelFourCompletedBoulders);
                }
              );
              break;
            case "Black":
              this.setState(
                {
                  levelFiveCompletedBoulders:
                    this.state.levelFiveCompletedBoulders + 1
                },
                function() {
                  console.log(this.state.levelFiveCompletedBoulders);
                }
              );
              break;
          }
        });
      }
    });
  }

  calculatePercentage = (completed, overall) => {
    var percentage;
    percentage = ((completed / overall) * 100).toFixed(2);
    if (isNaN(percentage)) {
      percentage = percentage || 0;
    }

    return percentage;
  };

  componentDidMount() {
    const { firebase } = this.props;
    const { id } = this.props.match.params;

    var db = firebase.firestore();
    var userRef = db.collection("users").doc(id);
    userRef.get().then(doc => {
      const boulder_array = doc.data().completedBoulders;
      if (typeof boulder_array == "undefined" || boulder_array.length === 0) {
        this.setState(
          {
            completedBouldersIsEmpty: true
          },
          function() {
            console.log(this.state.completedBouldersIsEmpty);
            console.log("Showing the alert and empty chart");
            if (this.state.completedBouldersIsEmpty === true) {
              this.renderEmptyChart();
            }
          }
        );
      } else {
        this.setState(
          {
            completedBouldersIsEmpty: false
          },
          function() {
            console.log(this.state.completedBouldersIsEmpty);
            console.log("Showing the painted chart");
            if (this.state.completedBouldersIsEmpty === false) {
              this.renderPaintedChart();
            }
          }
        );
      }
    });
  }
  // if (this.state.completedBouldersIsEmpty === true) {
  //   console.log("Called Emtpy");
  //   this.renderEmptyChart();
  // }
  // if (this.state.completedBouldersIsEmpty === true) {
  //   this.renderPaintedChart(
  //     this.state.levelOneCompletedBoulders,
  //     this.state.levelTwoCompletedBoulders,
  //     this.state.levelThreeCompletedBoulders,
  //     this.state.levelFourCompletedBoulders,
  //     this.state.levelFiveCompletedBoulders
  //   );
  //   console.log("Called Painted");
  // }

  // Donut-Chart
  renderEmptyChart = () => {
    var canv = document.getElementById("doughnutChart1").getContext("2d");

    var myLineChart = new Chart(canv, {
      type: "doughnut",
      data: {
        datasets: [
          {
            data: [1],
            backgroundColor: ["#e2e3e5"],
            hoverBackgroundColor: ["#e2e3e5"]
          }
        ]
      }
    });
  };

  renderPaintedChart = () => {
    // var canv = this.myRef2.current;
    // console.log(canv);

    // var canv2 = this.myRef1.current;
    // console.log(canv2);
    // canv2.style.display = "none";

    var canv = document.getElementById("doughnutChart2").getContext("2d");

    var myLineChart = new Chart(canv, {
      type: "doughnut",
      data: {
        labels: ["Level 1", "Level 2", "Level 3", "Level 4", "Level 5"],
        datasets: [
          {
            data: [
              this.state.levelOneCompletedBoulders,
              this.state.levelTwoCompletedBoulders,
              this.state.levelThreeCompletedBoulders,
              this.state.levelFourCompletedBoulders,
              this.state.levelFiveCompletedBoulders
            ],
            backgroundColor: [
              "#ffbb33",
              "#00C851",
              "#33b5e5",
              "#ff4444",
              "#2E2E2E"
            ],
            hoverBackgroundColor: [
              "#ffbb33",
              "#00C851",
              "#33b5e5",
              "#ff4444",
              "#2E2E2E"
            ]
          }
        ]
      },
      options: {
        responsive: true
      }
    });
  };

  render() {
    const { completedBouldersIsEmpty } = this.state;
    const { user } = this.props;

    const { firebase } = this.props;
    var db = firebase.firestore();

    if (user) {
      return (
        <div>
          <h1>User Profile</h1>
          <div className="row">
            <div className="col-md-12">
              <div className="card card-body mb-3">
                <div className="row">
                  <div className="col-md-3">
                    <img className="img-thumbnail img-fluid" src={examplepic} />
                    <br />
                    {completedBouldersIsEmpty ? <br /> : null}
                    <ul className="list-group">
                      <br />
                      <br />

                      <li className="list-group-item">
                        Username: {user.username}
                      </li>
                      <li className="list-group-item">
                        Name: {user.firstName} {user.lastName}
                      </li>
                      <li className="list-group-item">
                        Ticked Boulders: {user.tickedBoulders} /{" "}
                        {this.state.overallBoulders}
                      </li>
                      <li className="list-group-item">
                        Leaderboard Position:{" "}
                      </li>
                    </ul>
                  </div>
                  <div className="col-md-9">
                    {completedBouldersIsEmpty ? (
                      <div
                        className="alert alert-primary text-center"
                        role="alert"
                      >
                        You haven't ticked any boulders yet!{" "}
                        <a href="/logboulder" className="alert-link">
                          Tick Boulders
                        </a>
                        . Give it a click if you like.
                      </div>
                    ) : null}
                    {completedBouldersIsEmpty ? (
                      <React.Fragment>
                        <canvas id="doughnutChart1" ref={this.ref1} />
                        <br />
                      </React.Fragment>
                    ) : (
                      <React.Fragment>
                        <canvas id="doughnutChart2" ref={this.ref2} />
                        <br />
                        <br />
                      </React.Fragment>
                    )}

                    <div className="container">
                      <div className="row">
                        <div className="col-sm-2">
                          <div style={{ width: "145%" }}>
                            <CircularProgressbar
                              value={this.calculatePercentage(
                                this.state.levelOneCompletedBoulders,
                                this.state.levelOneBoulders
                              )}
                              text={`${this.calculatePercentage(
                                this.state.levelOneCompletedBoulders,
                                this.state.levelOneBoulders
                              )}%`}
                              styles={buildStyles({
                                textColor: "#ffbb33",
                                pathColor: "#ffbb33",
                                trailColor: "#e2e3e5"
                              })}
                            />
                          </div>
                        </div>
                        <div className="col-sm-2">
                          <div style={{ width: "145%", marginLeft: "20px" }}>
                            <CircularProgressbar
                              value={this.calculatePercentage(
                                this.state.levelTwoCompletedBoulders,
                                this.state.levelTwoBoulders
                              )}
                              text={`${this.calculatePercentage(
                                this.state.levelTwoCompletedBoulders,
                                this.state.levelTwoBoulders
                              )}%`}
                              styles={buildStyles({
                                textColor: "#00C851",
                                pathColor: "#00C851",
                                trailColor: "#e2e3e5"
                              })}
                            />
                          </div>
                        </div>
                        <div className="col-sm-2">
                          <div style={{ width: "145%", marginLeft: "40px" }}>
                            <CircularProgressbar
                              value={this.calculatePercentage(
                                this.state.levelTwoCompletedBoulders,
                                this.state.levelTwoBoulders
                              )}
                              text={`${this.calculatePercentage(
                                this.state.levelThreeCompletedBoulders,
                                this.state.levelThreeBoulders
                              )}%`}
                              styles={buildStyles({
                                textColor: "#33b5e5",
                                pathColor: "#33b5e5",
                                trailColor: "#e2e3e5"
                              })}
                            />
                          </div>
                        </div>
                        <div className="col-sm-2">
                          <div style={{ width: "145%", marginLeft: "60px" }}>
                            <CircularProgressbar
                              value={this.calculatePercentage(
                                this.state.levelFourCompletedBoulders,
                                this.state.levelFourBoulders
                              )}
                              text={`${this.calculatePercentage(
                                this.state.levelFourCompletedBoulders,
                                this.state.levelFourBoulders
                              )}%`}
                              styles={buildStyles({
                                textColor: "#ff4444",
                                pathColor: "#ff4444",
                                trailColor: "#e2e3e5"
                              })}
                            />
                          </div>
                        </div>
                        <div className="col-sm-2">
                          <div style={{ width: "145%", marginLeft: "80px" }}>
                            <CircularProgressbar
                              value={this.calculatePercentage(
                                this.state.levelFiveCompletedBoulders,
                                this.state.levelFiveBoulders
                              )}
                              text={`${this.calculatePercentage(
                                this.state.levelFiveCompletedBoulders,
                                this.state.levelFiveBoulders
                              )}%`}
                              styles={buildStyles({
                                textColor: "#2E2E2E",
                                pathColor: "#2E2E2E",
                                trailColor: "#e2e3e5"
                              })}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return <Spinner />;
    }
  }
}

export default compose(
  firestoreConnect(props => [
    { collection: "users", storeAs: "user", doc: props.match.params.id }
  ]),
  connect(({ firestore: { ordered } }, props) => ({
    user: ordered.user && ordered.user[0]
  }))
)(Profile);
