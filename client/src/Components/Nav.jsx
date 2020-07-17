import React from "react";
import pfp from "../Images/testpfp.jpeg";
import MyLink from "./MyLink";
import DropdownMenu from "./DropdownMenu";
import styles from "../Styles/navbar.module.css";

function Nav() {
  return (
    <nav className={styles.navbar}>
      <DropdownMenu
        className={styles.userMenu}
        button={
          <img
            className={styles.userMenu__pfp}
            src={pfp}
            alt="Profile picture"
          />
        }
      >
        <MyLink to="/createAccount">Create account</MyLink>
        <MyLink to="#">Log out</MyLink>
        {/* Log out With props here */}
      </DropdownMenu>
      {/*temp image for demo ||| terciary operator here for logged in button
      if logged out, or icon + menu for option of logging out*/}

      <DropdownMenu align="right">
        <MyLink to="/cities">Cities</MyLink>
        <MyLink to="/">Home</MyLink>
      </DropdownMenu>
    </nav>
  );
}

export default Nav;
