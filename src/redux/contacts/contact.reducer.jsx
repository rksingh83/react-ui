const INITIAL_STATE = {
  contacts: [],
};

const contactsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "SET_CONTACTS":
      return {
        ...state,
        contacts: action.payload,
      };
    default:
      return state;
  }
  return state;
};

export default contactsReducer;
