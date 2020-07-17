import React, { useState } from "react";
import styles from "../Styles/dropDownMenu.module.css";
import HamburgerMenu from "./HamburgerMenu";

function LinkItem({ children }) {
  return <li className={styles.list__item}>{children}</li>;
}

function DropdownMenu({ children, button, align, className }) {
  const [expandMenu, setExpand] = useState(false);

  return (
    <div
      className={`${styles.dropDownMenu} ${className || ""}`}
      onClick={() => setExpand(!expandMenu)}
    >
      {button ? button : <HamburgerMenu toggleVar={expandMenu} />}
      <div
        className={`${styles.dropDownMenu__content} ${
          align === "right" ? styles.dropDownMenu__content____alignRight : ""
        }
          ${
            expandMenu
              ? styles.dropDownMenu__content____down
              : styles.dropDownMenu__content____up
          }`}
      >
        {/* <ul>{children.find(({ type }) => type === Item)}</ul> */}

        {/* {children.map((e) => {
            if (e.type === Item) {
              return e;
            }
          })} */}

        <ul className={styles.list}>
          {children.map((child) => (
            <LinkItem>{child}</LinkItem>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default DropdownMenu;
