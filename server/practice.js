import Reducer from './reducer.js';
import { createContext, useReducer, useEffect } from 'react';

const initialLoginData = {
  id: JSON.parse(localStorage.getItem('id')) || null,
  editable: localStorage.getItem('editable') || null,
  profilePic: localStorage.getItem('profilePic') || null,
  email: localStorage.getItem('email') || null,
};
// 리액트에서 렌더링 될때마다 빈 객체만 나타나기 때문에
// 로그인 될때 setItem을 통해서 localStroage에 저장된
// 객체를 가져와 넣어준다.

export const Context = createContext(initialLoginData);

export const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, initialLoginData);

  useEffect(() => {
    localStorage.setItem('id', JSON.stringify(state.id));
    localStorage.setItem('editable', state.editable);
    localStorage.setItem('profilePic', state.profilePic);
    localStorage.setItem('email', state.email);
  }, [state.id]);
  // dispatch action 객체에서 type에 따라 가지고 온,
  // payload 를 return한 값에 따라 state를 업데이트 된다.
  // state.id가 업데이트 되면 로컬스토리지 또한 업데이트 시킨다.

  return (
    <Context.Provider
      value={{
        id: state.id,
        editable: state.editable,
        profilePic: state.profilePic,
        dispatch,
      }}
    >
      {children}
    </Context.Provider>
  );
};
