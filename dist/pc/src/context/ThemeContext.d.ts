/// <reference types="react" />
type ThemeContextType = {
    toggle: () => void;
    mode: 'light' | 'dark';
};
export declare const ThemeContext: import("react").Context<ThemeContextType>;
export declare const ThemeContextProvider: ({ children }: {
    children: React.ReactNode;
}) => import("react").JSX.Element;
export {};
