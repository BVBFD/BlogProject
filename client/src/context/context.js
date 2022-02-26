import { createContext, useEffect, useReducer } from "react";
import Reducer from "./reducer.js";

const initialLoginData = {
  id: JSON.parse(localStorage.getItem("id")) || null,
  isFetching: false,
  error: false,
};

export const Context = createContext(initialLoginData);

export const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, initialLoginData);

  useEffect(() => {
    localStorage.setItem("id", JSON.stringify(state.id));
  }, [state.id]);

  return (
    <Context.Provider
      value={{
        id: state.id,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </Context.Provider>
  );
};
