const initialState = {
    roles: [],
}

const todo = (state = initialState, action) => {
    switch (action.type) {
        case "GET_SUBJECT":
            // console.log("aa", action)
            return { ...state, subjectAction: action.subjectReducer }
        case "POST_SUBJECT":
            // console.log("aa", action)
            return { ...state, subjectAction: action.subjectReducer }
        default:
            return state
    }
}

export default todo