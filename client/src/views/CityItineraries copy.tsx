import React, { useEffect, useState } from "react";
import { makeStyles, Typography, Grid, Button } from "@material-ui/core";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";

import NewItineraryModal from "../Components/NewItineraryModal/NewItineraryModal";
import { getItineraries } from "../api";
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

type ItineraryType = {
  title: string;
  author: string;
  shortDescription: string;
  content: string;
  likes: number;
  tags: [string?, string?, string?];
};

const CityItineraries = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isLoading, error, data } = useQuery<ItineraryType[]>(
    "itineraries",
    getItineraries
  );
  //White above and below top have different shades of gray
  const { cityBanner, image, details, body } = useStyles();
  //TODO: check if city exists and fetch it
  const { cityId } = useParams<{ cityId: string }>();

  useEffect(() => {
    document.title = "London Itineraries";
  }, []);

  return (
    <div>
      <header className={cityBanner}>
        <img
          className={image}
          src={`https://source.unsplash.com/daily?London,architecture`}
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
          <Itinerary
            title="Shrimp and Chorizo Paella"
            description="This impressive paella is a perfect party dish and a fun meal to cook
            together with your guests. Add 1 cup of frozen peas along with the
            mussels, if you like."
            tags={["Nature", "Architecture"]}
          />
          {data &&
            data.map(
              ({ author, content, likes, shortDescription, tags, title }) => (
                <Grid item>
                  <Itinerary
                    title="Shrimp and Chorizo Paella"
                    description="This impressive paella is a perfect party dish and a fun meal to cook
            together with your guests. Add 1 cup of frozen peas along with the
            mussels, if you like."
                    tags={tags}
                  />
                </Grid>
              )
            )}
        </Grid>
      </div>

      <Grid container justify="center">
        <Button
          size="large"
          color="primary"
          variant="contained"
          type="button"
          onClick={() => setIsModalOpen(true)}
        >
          New City
        </Button>
      </Grid>
      <NewItineraryModal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};
// #49976B

export default CityItineraries;
