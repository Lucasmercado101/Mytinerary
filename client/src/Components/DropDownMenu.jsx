import React, { useState, useRef } from "react";
import styles from "../Styles/dropDownMenu.module.css";
import { useLocation } from "react-router-dom";
import HamburgerMenu from "./HamburgerMenu";
import useOutsideAlerter from "./hooks/useOutsideAlerter";

export function MenuItem({ children, onClick, style }) {
  return (
    <li onClick={onClick} style={style} className={styles.contentList__item}>
      {children}
    </li>
  );
}

function DropDownMenu({ children, button, align, closeOnClick }) {
  const [open, setOpen] = useState(false);
  const location = useLocation().pathname;

  const ref = useRef();
  useOutsideAlerter(
    ref,
    () => {
      setOpen(false);
    },
    [open]
  );

  return (
    <div className={styles.dropDown} ref={ref}>
      {button ? (
        React.cloneElement(button, { onClick: () => setOpen(!open) })
      ) : (
        <HamburgerMenu onClick={() => setOpen(!open)} toggleVar={open} />
      )}
      <ul
        style={align === "right" ? { right: 0 } : {}}
        className={`${styles.contentList} ${
          open ? styles.contentList____open : styles.contentList____closed
        }`}
      >
        {closeOnClick ? (
          <div
            onClick={() => {
              console.log(location);
              setOpen(false);
            }}
          >
            {children}
          </div>
        ) : (
          children
        )}
      </ul>
    </div>
  );
}

export default DropDownMenu;
