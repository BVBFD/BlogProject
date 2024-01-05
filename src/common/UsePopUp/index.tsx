import React, { useContext, useEffect, useMemo, useState } from 'react';
import { PopUpContextValueType, PopUpProviderPropsType } from '../common';

const PopUpContext = React.createContext<PopUpContextValueType>({
  showPopUp: () => {},
  closePopUp: () => {},
});

const PopUpProvider = ({ children }: PopUpProviderPropsType) => {
  const [openPopUp, setOpenPopUp] = useState<React.ReactNode>();

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
