import { createContext, useEffect, useReducer } from "react";
import Reducer from "./reducer.js";

const initialLoginData = {
  id: JSON.parse(localStorage.getItem("id")) || null,
  token: JSON.parse(localStorage.getItem("token")) || null,
};

export const Context = createContext(initialLoginData);

export const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, initialLoginData);

  useEffect(() => {
    localStorage.setItem("id", JSON.stringify(state.id));
    localStorage.setItem("token", JSON.stringify(state.token));
  }, [state.id]);

  return (
    <Context.Provider
      value={{
        id: state.id,
        token: state.token,
        dispatch,
      }}
    >
      {children}
    </Context.Provider>
  );
};
