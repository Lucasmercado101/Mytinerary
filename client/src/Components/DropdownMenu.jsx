import React, { useState } from "react";
import styles from "../Styles/dropDownMenu.module.css";
import HamburgerMenu from "./HamburgerMenu";

function LinkItem({ children }) {
  return <li className={styles.list__item}>{children}</li>;
}

function DropdownMenu({
  children,
  nav,
  card,
  button,
  style,
  align,
  className,
}) {
  const [expandMenu, setExpand] = useState(false);

  return (
    <div
      style={style || {}}
      className={`${styles.dropDownMenu} ${className || ""}`}
    >
      {button ? (
        React.cloneElement(button, { onClick: () => setExpand(!expandMenu) })
      ) : (
        <HamburgerMenu
          onClick={() => setExpand(!expandMenu)}
          toggleVar={expandMenu}
        />
      )}
      <div
        className={`${styles.dropDownMenu__content} ${
          nav ? styles.dropDownMenu__content____nav : ""
        } ${card ? styles.dropDownMenu__content____card : ""} ${
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
          {children.length > 1
            ? children.map((child, i) => {
                if (child.type.name === "MyLink") {
                  return <LinkItem key={i}>{child}</LinkItem>;
                }
              })
            : children}
        </ul>
      </div>
    </div>
  );
}

export default DropdownMenu;
