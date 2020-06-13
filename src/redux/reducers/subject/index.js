const initialState = {
    subjects: [],
}

const subject = (state = initialState, action) => {
    switch (action.type) {
        case "GET_SUBJECT":
            // console.log("aa", action)
            return { ...state, subject: action.subjects }
        case "POST_SUBJECT":
            // console.log("aa", action)
            return { ...state, subject: action.subjects }
        default:
            return state
    }
}

export default subject
