const INITIAL_STATE = {
  books: [],
  currentBookId:0
};

const allBooksReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "SET_USER_BOOKS":
      return {
        ...state,
        books: action.payload,
      };
    case "SET_CURRENT_BOOK_ID":
      return {
        ...state,
        currentBookId: action.payload,
      };
    default:
      return state;
  }
  return state;
};

export default allBooksReducer;
