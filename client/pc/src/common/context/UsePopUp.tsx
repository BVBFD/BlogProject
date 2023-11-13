'use client';

import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

const PopUpContext = createContext({
  // 언더스코어로 시작하는 변수명을 사용하는 것은
  // 해당 변수가 특정 함수나 스코프 내부에서만
  // 사용되어야 하며, 외부에서의 접근이나 직접적인
  // 변경을 피해야 한다는 것을 나타내는 것
  // 하나의 매개변수 작명관습임

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  showPopUp: (_popUp: JSX.Element): void | Record<never, string> => {},
  closePopUp: (): void | Record<never, string> => {},
});

const PopUpProvider = ({ children }) => {
  const [openPopUp, setOpenPopUp] = useState<React.ReactNode>();

  // 다시 한번 말하지만, contextAPI에 등록된 value가
  // 매번 렌더링 될때마다 객체가 생성되고
  // 이렇게 불필요하게 렌더링이 되니깐,
  // 해당 참조값이 변경이 되어 또 렌더링이 일어나는
  // 성능저하, 메모리 누수 문제가 발생
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

  // PopUp창 열때 재렌더링
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
