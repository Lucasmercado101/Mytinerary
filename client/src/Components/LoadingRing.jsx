import React from "react";
import styles from "../Styles/loadingRing.module.css";

function LoadingRing({ style, centered, absoluteCentered }) {
  return (
    <div
      style={style}
      className={`lds-ring ${centered ? styles.centered : ""} ${
        absoluteCentered ? styles.absoluteCentered : ""
      }`}
    >
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}

export default LoadingRing;
