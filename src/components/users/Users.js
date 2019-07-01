import React, { Component } from "react";
import { Link } from "react-router-dom";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import PropTypes from "prop-types";
import Spinner from "../layout/Spinner";

class Users extends Component {
  render() {
    const { users } = this.props;
    var number = 0;
    const incrementNumber = () => {
      number++;
      return number;
    };

    if (users) {
      return (
        <div>
          <div>
            <div className="row">
              <div className="col-md-6">
                <h2>
                  <i className="fas fa-users"> Leaderboard</i>
                </h2>
              </div>
            </div>
          </div>

          <table id="leaderboardTable" className="table">
            <thead className="thead-inverse thead-light">
              <tr>
                <th style={{ cursor: "pointer" }}>#</th>
                <th style={{ cursor: "pointer" }}>Name</th>
                <th style={{ cursor: "pointer" }}>Completed Boulders</th>
                <th style={{ cursor: "pointer" }}>Points</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {users
                .slice()
                .sort((a, b) => b.tickedBoulders - a.tickedBoulders)
                .map(user => (
                  <tr key={user.id}>
                    <td>{incrementNumber()}</td>
                    <td width="40%">
                      {user.firstName} {user.lastName}
                    </td>
                    <td>{user.tickedBoulders} / 60</td>
                    <td>{user.tickedBoulders * 10}</td>
                    <td align="right">
                      <Link
                        to={`/profile/${user.id}`}
                        className="btn btn-secondary btn-sm bg-primary"
                      >
                        <i className="fas fa-arrow-circle-right">
                          {" "}
                          View Profile
                        </i>
                      </Link>
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

Users.propTypes = {
  firestore: PropTypes.object.isRequired,
  users: PropTypes.array
};

export default compose(
  firestoreConnect([{ collection: "users" }]),
  connect((state, props) => ({
    users: state.firestore.ordered.users
  }))
)(Users);
