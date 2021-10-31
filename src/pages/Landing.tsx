import { Typography } from "@mui/material";
import { useHistory } from "react-router-dom";
import arrowRight from "../assets/arrowRight.svg";
import mytinerary_logo from "../assets/mytinerary_logo.svg";
import heroBgr from "../assets/heroBgr.jpg";

function Landing() {
  const history = useHistory();

  return (
    <div>
      <section
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
          alignItems: "center",
          height: "calc(100vh - 56px)",
          width: "100vw"
        }}
      >
        <img
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center",
            position: "absolute",
            top: 0,
            left: 0,
            zIndex: -1,
            filter: "brightness(0.5)"
          }}
          src={heroBgr}
          alt="hero"
        />
        <img
          style={{
            width: "90%"
          }}
          src={mytinerary_logo}
          alt="mytinerary logo"
        />
        <Typography textAlign="center" variant="h4" component="h1">
          Find your perfect trip, designed by insiders who know and love their
          cities.
        </Typography>
        <img
          onClick={() => history.push("/cities")}
          style={{
            width: "45%",
            maxWidth: 300,
            cursor: "pointer"
          }}
          src={arrowRight}
          alt="arrow"
        />
      </section>
    </div>
  );
}

export default Landing;
