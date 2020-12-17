import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";

const CenteredProgressCircle: React.FC = () => {
  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "grid",
        placeItems: "center"
      }}
    >
      <div style={{ width: "25%", maxWidth: "150px" }}>
        <CircularProgress style={{ width: "100%", height: "100%" }} />
      </div>
    </div>
  );
};

export default CenteredProgressCircle;
