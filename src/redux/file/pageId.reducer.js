const INITIAL_STATE = {
    currentImage: ''
}


const currentImageReducer = (state = INITIAL_STATE, action) => {

    switch (action.type) {
        case "SET_CURRENT_PAGE_ID":
            return {

                ...state,
                currentImage: action.payload
            }
        default:
            return state
    }
    return state
}

export default currentImageReducer;