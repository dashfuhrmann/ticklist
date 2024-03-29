import React from "react";
import classnames from "classnames";
import PropTypes from "prop-types";

const Alert = props => {
  const { message, messageType } = props;
  return (
    <div
      id="alert-message"
      style={{ textAlign: "center" }}
      className={classnames("alert", {
        "alert-succes": messageType === "success",
        "alert-danger": messageType === "error"
      })}
    >
      {message}
    </div>
  );
};

Alert.propTypes = {
  message: PropTypes.string.isRequired,
  messageType: PropTypes.string.isRequired
};
export default Alert;
