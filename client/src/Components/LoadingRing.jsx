import React from "react";
import styles from "../Styles/loadingRing.module.css";

function LoadingRing({ style, centered, absoluteCentered, white }) {
  return (
    <div
      style={style}
      className={`lds-ring ${centered ? styles.centered : ""} ${
        absoluteCentered ? styles.absoluteCentered : ""
      }`}
    >
      <div style={white ? { borderTopColor: "white" } : {}}></div>
      <div style={white ? { borderTopColor: "white" } : {}}></div>
      <div style={white ? { borderTopColor: "white" } : {}}></div>
      <div style={white ? { borderTopColor: "white" } : {}}></div>
    </div>
  );
}

export default LoadingRing;
