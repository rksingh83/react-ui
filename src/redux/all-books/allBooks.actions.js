export const setAllBooks = books => ({
    type: 'SET_USER_BOOKS',
    payload: books
})

export const setCurrentBookId = id => ({
    type: 'SET_CURRENT_BOOK_ID',
    payload: id
})