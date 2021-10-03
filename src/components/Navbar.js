import React from "react";
import useBaseUrl from "@docusaurus/useBaseUrl";

const Navbar = () => (
  <nav className="navbar navbar--fixed-top">
    <div className="navbar__inner">
      <div className="navbar__items">
        <button
          aria-label="Navigation bar toggle"
          className="navbar__toggle clean-btn"
          type="button"
          tabIndex="0"
        >
          <svg width="30" height="30" viewBox="0 0 30 30" aria-hidden="true">
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeMiterlimit="10"
              strokeWidth="2"
              d="M4 7h22M4 15h22M4 23h22"
            ></path>
          </svg>
        </button>
        <a className="navbar__brand" href="/">
          <img
            src={useBaseUrl("img/logo.svg")}
            alt="logo"
            className="themedImage--light_node_modules-@docusaurus-theme-classic-lib-next-theme-ThemedImage-styles-module navbar__logo"
          />
          <b className="navbar__title">jb siraudin</b>
        </a>
        <a className="navbar__item navbar__link" href="/blog">
          Blog
        </a>
      </div>
    </div>
    <div role="presentation" className="navbar-sidebar__backdrop"></div>
  </nav>
);

export default Navbar;
