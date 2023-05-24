import { ButtonProps } from 'antd';

type OverlayPropsType = {
  children?: JSX.Element | JSX.Element[];
  onClick?: () => void;
  zIndex?: number;
};

type CustomScrollPropsType = {
  children: React.ReactNode;
  className?: string;
  maxHeight?: 'fitContent' | number;
  paddingTop?: number;
  paddingBottom?: number;
  paddingRight?: number;
  paddingLeft?: number;
  marginTop?: number;
  marginBottom?: number;
  marginRight?: number;
  marginLeft?: number;
};

type PopUpPropsType = {
  title: JSX.Element;
  content: JSX.Element;
  maxWidth?: number;
  onClose?: () => void;
  footer?: JSX.Element;
  popUpCustomCSSContainer?: string;
  isCloseIcon?: boolean;
  closeIconLocation?: {
    top?: number;
    bottom?: number;
    left?: number;
    right?: number;
  };
};

type PopUpProviderPropsType = {
  children: JSX.Element | JSX.Element[];
  //   dataProps?: Array<never>;
  //   customCallbackProps?: Array<<T = never>(data?: T) => void | T>;
};

type PopUpContextValueType = {
  showPopUp: (popUp: JSX.Element) => void;
  closePopUp: () => void;
};

interface BasicButtonProps extends ButtonProps {
  children: React.ReactNode;
  BasicButtonType?: 'medium' | 'small' | 'primary';
}
