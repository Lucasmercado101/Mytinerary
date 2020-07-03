import React, { useState } from "react";
import pfp from "../Images/testpfp.jpeg";
import MyLink from "./MyLink";
import "../Styles/navbar.css";

function Nav() {
  const [expandMenu, setExpand] = useState(false);
  const [expandUserMenu, setExpandUserMenu] = useState(false);

  return (
    <nav>
      <div className="dropdown-user-menu">
        <img
          src={pfp}
          alt="Profile picture"
          onClick={() => setExpandUserMenu(!expandUserMenu)}
        />
        <div
          className={
            "dropdown-user-menu-content " + (expandUserMenu ? "down" : "up")
          }
        >
          <ul>
            <li>
              <MyLink
                onClick={() => setExpandUserMenu(false)}
                to="/createAccount"
              >
                Create account
              </MyLink>
            </li>
            {/*
            <li>
              <MyLink to="/">Log out</MyLink>
              //   log out with props here
            </li>*/}
          </ul>
        </div>
      </div>
      {/*temp image for demo ||| terciary operator here for logged in button
      if logged out, or icon + menu for option of logging out*/}

      <div className="dropdown-menu">
        <div
          className={"burger-menu " + (expandMenu ? "change" : "")}
          onClick={() => setExpand(!expandMenu)}
        >
          <div className="bar1 bar"></div>
          <div className="bar2 bar"></div>
          <div className="bar3 bar"></div>
        </div>
        <div
          className={"dropdown-menu-content " + (expandMenu ? "down" : "up")}
        >
          <ul>
            <li>
              <MyLink onClick={() => setExpand(false)} to="/cities">
                Cities
              </MyLink>
            </li>
            <li>
              <MyLink onClick={() => setExpand(false)} to="/">
                Home
              </MyLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

//add more things to the default menu

export default Nav;
