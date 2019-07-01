import { NOTIFY_USER } from "../actions/Types";

const initalState = {
  message: null,
  mesageType: null
};

export default function(state = initalState, action) {
  switch (action.type) {
    case NOTIFY_USER:
      return {
        ...state,
        message: action.message,
        messageType: action.messageType
      };
    default:
      return state;
  }
}
