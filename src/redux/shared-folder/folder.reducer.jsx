const INITIAL_STATE = {
  sharedWithMe: true,
};

const folderFlagReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "SET_FOLDER_FLAG":
      return {
        ...state,
        sharedWithMe: action.payload,
      };
    default:
      return state;
  }
  return state;
};

export default folderFlagReducer;
