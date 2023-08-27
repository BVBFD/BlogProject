"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
exports.ThemeContextProvider = exports.ThemeContext = void 0;
var react_1 = require("react");
exports.ThemeContext = (0, react_1.createContext)({
    toggle: function () { },
    mode: 'light',
});
var ThemeContextProvider = function (_a) {
    var children = _a.children;
    var _b = (0, react_1.useState)('light'), mode = _b[0], setMode = _b[1];
    var toggle = function () {
        setMode(function (prev) { return (prev === 'light' ? 'dark' : 'light'); });
    };
    return (<exports.ThemeContext.Provider value={{ toggle: toggle, mode: mode }}>
      <div className={"theme ".concat(mode)}>{children}</div>
    </exports.ThemeContext.Provider>);
};
exports.ThemeContextProvider = ThemeContextProvider;
//# sourceMappingURL=ThemeContext.jsx.map