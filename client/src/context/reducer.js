const Reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return {
        id: action.payload.userId,
        token: action.payload.token,
      };

    case "LOGOUT":
      return {
        id: null,
        token: null,
      };

    default:
      return state;
  }
};

export default Reducer;
