const initialState = {
  boards: [],
};

const board = (state = initialState, action) => {
  switch (action.type) {
    case "LIST_BOARD":
      // console.log("aa", action)
      return { ...state, role: action.roles };
    case "POST_BOARD":
      // console.log("aa", action)
      return { ...state, role: action.roles };
    default:
      return state;
  }
};

export default board;
