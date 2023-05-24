import React, { useContext, useEffect, useMemo, useState } from 'react';
import { PopUpContextValueType, PopUpProviderPropsType } from '../common';

const PopUpContext = React.createContext<PopUpContextValueType>({
  showPopUp: () => {},
  closePopUp: () => {},
});

const PopUpProvider = ({ children }: PopUpProviderPropsType) => {
  const [openPopUp, setOpenPopUp] = useState<React.ReactNode>();

  //   contextAPI에 등록된 value가 매번 렌더링 될때마다 객체가 생성되고
  //   이렇게 불필요하게 렌더링이 되니깐,
  //   해당 참조값이 변경이 되어 또 렌더링이 일어나는 성능저하,
  //   메모리 누수 문제가 발생
  const providerValue = useMemo(() => {
    return {
      showPopUp: (popUp: JSX.Element) => {
        setOpenPopUp(popUp);
      },
      closePopUp: () => {
        setOpenPopUp(<div />);
      },
    };
  }, []);

  useEffect(() => {}, [openPopUp]);

  return (
    <PopUpContext.Provider value={providerValue}>
      {children}
      {openPopUp}
    </PopUpContext.Provider>
  );
};

const usePopUp = () => {
  const popups = useContext(PopUpContext);
  return popups;
};

export { PopUpProvider, usePopUp };
