const initialState = {
    class: [],
}

const classes = (state = initialState, action) => {
    switch (action.type) {
        case "GET_CLASS":
            // console.log("aa", action)
            return {...state, class: action.classes }
        case "POST_CLASS":
            // console.log("aa", action)
            return {...state, class: action.classes }
        case "UPDATE_CLASS":
          // console.log("aa", action)
          return {...state, class: action.classes }
        default:
            return state
    }
}

export default classes
