const initialState = {
    role: [],
    loading: false,
    error: ''
}

const role = (state = initialState, action) => {
    switch (action.type) {
        case "LOADING": 
            return {...state, loading: true, error: '' };
        case "GET_USERS":
            return {...state, loading: false, role: action.roles }
        case "POST_ROLE":
            return {...state, role: action.roles }
        case "ERROR":
            return { ...state, error:action.err, role: '' }
        default:
            return state
    }
}

export default role