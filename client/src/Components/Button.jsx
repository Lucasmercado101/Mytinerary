import React from "react";
import styles from "../Styles/button.module.css";

function button(props) {
  return (
    <button
      className={`${styles.button} ${
        props.centered ? styles.button__centered : ""
      } ${props.alert ? styles.button__alert : ""} ${
        props.big ? styles.button__big : ""
      }`}
      {...props}
    >
      {props.text}
    </button>
  );
}

export default button;
