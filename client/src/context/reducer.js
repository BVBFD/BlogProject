const Reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        id: null,
        isFetching: true,
        error: false,
      };

    case "LOGIN_SUCCESS":
      return {
        id: action.payload.userId,
        isFetching: false,
        error: false,
      };

    case "LOGIN_FAILURE":
      return {
        id: null,
        isFetching: false,
        error: false,
      };

    case "LOGOUT":
      return {
        id: null,
        isFetching: false,
        error: false,
      };

    default:
      return state;
  }
};

export default Reducer;
