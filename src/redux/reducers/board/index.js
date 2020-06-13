const initialState = {
    boards: [],
}

const board = (state = initialState, action) => {
    switch (action.type) {
        case "GET_BOARD":
            // console.log("aa", action)
            return {...state, board: action.boards }
        case "POST_BOARD":
            // console.log("aa", action)
            return {...state, board: action.boards }
        default:
            return state
    }
}

export default board
