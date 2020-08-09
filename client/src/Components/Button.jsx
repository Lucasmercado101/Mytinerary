import React from "react";
import styles from "../Styles/button.module.css";

function button({
  big,
  centered,
  style,
  text,
  danger,
  warning,
  onClick,
  disabled,
}) {
  return (
    <button
      style={style}
      className={`${styles.button} ${centered ? styles.button__centered : ""} ${
        danger ? styles.button__danger : ""
      } ${warning ? styles.button__warning : ""} ${
        big ? styles.button__big : ""
      }`}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
}

export default button;
