const INITIAL_STATE = {
  userNotificationCount: 0,
};

const notificationCountReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "SET_NOTIFICATION_COUNT":
      return {
        ...state,
        userNotificationCount: action.payload,
      };
    default:
      return state;
  }
  return state;
};

export default notificationCountReducer;
