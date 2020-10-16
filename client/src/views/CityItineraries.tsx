import React from "react";
import { makeStyles, Typography } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  cityBanner: {
    width: "100%",
    height: 350,
    overflow: "hidden",
    position: "relative",
    zIndex: 1
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    background: "black"
  },
  details: {
    position: "absolute",
    width: "100%",
    bottom: 0,
    left: 0,
    padding: 15,
    paddingBottom: 50,
    height: 150,
    color: "white",
    backgroundImage: "linear-gradient(rgba(0,0,0,0), black)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end"
  },
  body: {
    position: "relative",
    borderTopLeftRadius: "40px",
    borderTopRightRadius: "40px",
    background: "white",
    marginTop: -40,
    padding: 10,
    paddingTop: 40,
    zIndex: 2
  }
}));

const CityItineraries = () => {
  const { cityBanner, image, details, body } = useStyles();
  return (
    <div>
      <div className={cityBanner}>
        <img
          className={image}
          src="https://source.unsplash.com/1600x900/?rome,aerial"
        />
        <div className={details}>
          <Typography variant="h4" component="h1">
            London
          </Typography>
          <Typography variant="h5" component="h2">
            England
          </Typography>
        </div>
      </div>
      <div className={body}></div>
    </div>
  );
};

export default CityItineraries;
