import React from "react";

function LoadingRing({ style }) {
  return (
    <div style={style} className="lds-ring">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}

export default LoadingRing;
