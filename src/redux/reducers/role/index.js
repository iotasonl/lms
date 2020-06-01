const initialState = {
    roles: [],
}

const todo = (state = initialState, action) => {
    switch (action.type) {
        case "GET_USERS":
            // console.log("aa", action)
            return { ...state, role: action.roles}
        default:
            return state
    }
}

export default todo