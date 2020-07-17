import React from "react";
import styles from "../Styles/hamburgerMenu.module.css";

function HamburgerMenu({ onClick, toggleVar }) {
  return (
    <div
      className={`${styles.burgerMenu} ${
        toggleVar ? styles.burgerMenu__change : ""
      }`}
      onClick={onClick}
    >
      <div
        className={`${styles.burgerMenu__bar} ${styles.burgerMenu__bar____bar1}
            ${toggleVar ? styles.burgerMenu__bar____bar1____change : ""}`}
      ></div>
      <div
        className={`${styles.burgerMenu__bar} ${styles.burgerMenu__bar____bar2}
            ${toggleVar ? styles.burgerMenu__bar____bar2____change : ""}`}
      ></div>
      <div
        className={`${styles.burgerMenu__bar} ${styles.burgerMenu__bar____bar3}
            ${toggleVar ? styles.burgerMenu__bar____bar3____change : ""}`}
      ></div>
    </div>
  );
}

export default HamburgerMenu;
