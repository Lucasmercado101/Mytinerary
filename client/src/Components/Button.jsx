import React from "react";
import styles from "../Styles/button.module.css";

function button({ onClick, text, centered, alert }) {
  return (
    <button
      onClick={onClick}
      className={`${styles.button} ${centered ? styles.button__centered : ""} ${
        alert ? styles.button__alert : ""
      }`}
    >
      {text}
    </button>
  );
}

export default button;
