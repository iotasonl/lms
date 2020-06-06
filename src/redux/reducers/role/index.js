const initialState = {
    roles: [],
}

const role = (state = initialState, action) => {
    switch (action.type) {
        case "GET_USERS":
            // console.log("aa", action)
            return {...state, role: action.roles }
        case "POST_ROLE":
            // console.log("aa", action)
            return {...state, role: action.roles }
        default:
            return state
    }
}

export default role