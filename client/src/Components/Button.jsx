import React from "react";
import styles from "../Styles/button.module.css";

function button({ big, centered, text, alert, onClick, disabled }) {
  return (
    <button
      className={`${styles.button} ${centered ? styles.button__centered : ""} ${
        alert ? styles.button__alert : ""
      } ${big ? styles.button__big : ""}`}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
}

export default button;
