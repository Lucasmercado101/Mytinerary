import React, { useEffect } from "react";
import { makeStyles, Typography, Grid } from "@material-ui/core";
import Itinerary from "../Components/Itinerary/Itinerary";

const useStyles = makeStyles(({ palette }) => ({
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
    height: 250,
    color: "white",
    backgroundImage: "linear-gradient(rgba(0,0,0,0), black)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end"
  },
  body: {
    position: "relative",
    height: "calc(100% + 1000px)",
    borderTopLeftRadius: "40px",
    borderTopRightRadius: "40px",
    background: palette.grey[100],
    marginTop: -40,
    padding: 15,
    paddingTop: 40,
    zIndex: 2
  }
}));

const CityItineraries = () => {
  const { cityBanner, image, details, body } = useStyles();

  useEffect(() => {
    document.title = "London Itineraries";
  }, []);

  return (
    <div>
      <header className={cityBanner}>
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
      </header>
      <div className={body}>
        <Grid container spacing={2}>
          {[1, 2, 3, 4, 5].map(() => (
            <Grid item>
              <Itinerary
                title="Shrimp and Chorizo Paella"
                description="This impressive paella is a perfect party dish and a fun meal to cook
            together with your guests. Add 1 cup of frozen peas along with the
            mussels, if you like."
                tags={["Nature", "Architecture", "History "]}
              />
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  );
};
// #49976B

export default CityItineraries;
