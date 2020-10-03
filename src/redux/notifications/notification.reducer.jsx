const INITIAL_STATE = {
  userNotifications: [],
};

const notificationReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "SET_NOTIFICATION":
      return {
        ...state,
        userNotifications: action.payload,
      };
    default:
      return state;
  }
  return state;
};

export default notificationReducer;
