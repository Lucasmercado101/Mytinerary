import React, { useEffect, useState } from "react";
import {
  makeStyles,
  Typography,
  Grid,
  Button,
  TextField,
  InputAdornment
} from "@material-ui/core";
import { Search as SearchIcon } from "@material-ui/icons";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";

import NewItineraryModal from "../Components/NewItineraryModal/NewItineraryModal";
import { getItineraries } from "../api";
import Itinerary from "../Components/Itinerary/Itinerary";

const useStyles = makeStyles(({ breakpoints }) => ({
  cityBanner: {
    width: "100%",
    height: 350,
    overflow: "hidden",
    position: "relative",
    zIndex: 1,
    [breakpoints.up("md")]: {
      height: "100%",
      "&::after": {
        content: '""',
        position: "absolute",
        right: 0,
        bottom: 0,
        top: 0,
        width: 25,
        background: "white",
        borderTopLeftRadius: 25,
        borderBottomLeftRadius: 25,
        zIndex: 3
      }
    }
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    background: "black",
    [breakpoints.up("md")]: {
      position: "sticky",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0
    }
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
    borderTopLeftRadius: "40px",
    borderTopRightRadius: "40px",
    background: "white",
    marginTop: -40,
    padding: 15,
    paddingTop: 40,
    zIndex: 2,
    height: "100%",
    [breakpoints.up("md")]: {
      padding: 25,
      paddingLeft: 0,
      paddingTop: 0,
      margin: 0
    }
  },
  searchBar: {
    width: "100%"
  },
  itineraryContainer: {
    height: "calc(100% - 65px)",
    overflow: "auto"
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
  const {
    cityBanner,
    image,
    details,
    body,
    searchBar,
    itineraryContainer
  } = useStyles();
  //TODO: check if city exists and fetch it
  const { cityId } = useParams<{ cityId: string }>();

  useEffect(() => {
    document.title = "London Itineraries";
  }, []);

  return (
    <>
      <Grid
        container
        style={{ height: "100%", overflow: "hidden" }}
        direction="row"
      >
        <Grid item md={3} lg={4} className={cityBanner}>
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
        </Grid>
        <Grid md={9} lg={8} spacing={4} container className={body}>
          <Grid
            container
            spacing={4}
            direction="row"
            justify="center"
            alignItems="center"
            xs={12}
            item
          >
            <Grid xs={8} sm={8} md={9} item>
              <TextField
                className={searchBar}
                label="Search Itineraries"
                variant="outlined"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <SearchIcon />
                    </InputAdornment>
                  )
                }}
              />
            </Grid>
            <Grid xs={4} md={3} item>
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
          </Grid>
          {/* <Grid container justify="center">
            <Button
              size="large"
              color="primary"
              variant="contained"
              type="button"
              onClick={() => setIsModalOpen(true)}
            >
              New City
            </Button>
          </Grid> */}
          <Grid className={itineraryContainer} container item spacing={2}>
            {[1, 2, 3, 4, 5, 6, 9, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(() => (
              <Grid xs={12} sm={6} md={4} item>
                <Itinerary
                  title="Shrimp and Chorizo Paella"
                  description="This impressive paella is a perfect party dish and a fun meal to cook
            together with your guests. Add 1 cup of frozen peas along with the
            mussels, if you like."
                  tags={["Nature", "Architecture"]}
                />
              </Grid>
            ))}
            {/* {data &&
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
              )} */}
            {/* </Grid> */}
          </Grid>
        </Grid>
      </Grid>

      <NewItineraryModal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
      />
    </>
  );
};
// #49976B

export default CityItineraries;
