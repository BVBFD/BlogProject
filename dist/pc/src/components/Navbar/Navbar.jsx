"use strict";
'use client';
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var Navbar_module_scss_1 = __importDefault(require("./Navbar.module.scss"));
var image_1 = __importDefault(require("next/image"));
var logo_png_1 = __importDefault(require("public/imgs/logo.png"));
var link_1 = __importDefault(require("next/link"));
var ThemeContext_1 = require("@/context/ThemeContext");
var Navbar = function () {
    var _a = (0, react_1.useContext)(ThemeContext_1.ThemeContext), toggle = _a.toggle, mode = _a.mode;
    return (<nav className={Navbar_module_scss_1.default.navbar}>
      <link_1.default href={'/'} className={Navbar_module_scss_1.default.logoLink}>
        <div className={Navbar_module_scss_1.default.logo}>
          <image_1.default src={logo_png_1.default} alt="logo" fill={true}/>
        </div>
        <h1>LEO BLOG</h1>
      </link_1.default>

      <main>
        <div className={Navbar_module_scss_1.default.theme} onClick={toggle} style={mode === 'light' ? { border: '1.5px solid black' } : { border: '1.5px solid white' }}>
          <div className={Navbar_module_scss_1.default.icon}>🌙</div>
          <div className={Navbar_module_scss_1.default.icon}>🔆</div>
          <div className={Navbar_module_scss_1.default.ball} style={mode === 'dark' ? { right: '5px', backgroundColor: 'white' } : { left: '5px', backgroundColor: 'black' }}></div>
        </div>
        <link_1.default href={'/'} className={Navbar_module_scss_1.default.menuLink}>
          Home
        </link_1.default>
        <link_1.default href={'/portfolio'} className={Navbar_module_scss_1.default.menuLink}>
          Portfolio
        </link_1.default>
        <link_1.default href={'/blog'} className={Navbar_module_scss_1.default.menuLink}>
          Blog
        </link_1.default>
        <link_1.default href={'/about'} className={Navbar_module_scss_1.default.menuLink}>
          About
        </link_1.default>
        <link_1.default href={'/contact'} className={Navbar_module_scss_1.default.menuLink}>
          Contact
        </link_1.default>
      </main>
    </nav>);
};
exports.default = Navbar;
//# sourceMappingURL=Navbar.jsx.map