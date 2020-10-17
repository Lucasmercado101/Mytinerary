import React, { useEffect } from "react";
import mytineraryLogo from "../Images/mytinerary_logo.svg";
import {
  Grid,
  makeStyles,
  Button,
  Typography,
  Container,
  useTheme,
  useMediaQuery
} from "@material-ui/core";
import { Link } from "react-router-dom";
import HeroImg from "../Images/hero.svg";
// import Slider from "react-animated-slider";

const useStyles = makeStyles(() => ({
  landingPage: {
    height: "100%",
    width: "100%"
  },
  title: {
    textTransform: "capitalize"
  },
  landingSection: {
    width: "100%",
    height: "100%",
    padding: 25,
    margin: 0
  },
  logo: {
    width: "100%",
    display: "block",
    margin: "0 auto"
  },
  image: {
    width: "100%"
  },
  button: {
    width: "100%"
  }
}));

function Landing() {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));
  const {
    landingPage,
    logo,
    title,
    button,
    landingSection,
    image
  } = useStyles();

  useEffect(() => {
    document.title = "Mytinerary";
  }, []);
  //TODO: fix this
  return (
    <Container maxWidth="xl" className={landingPage}>
      {matches ? (
        <Grid style={{ height: "100%" }} container direction="row">
          <Grid
            xs={6}
            container
            spacing={6}
            wrap="nowrap"
            justify="center"
            direction="column"
            className={landingSection}
            component="section"
          >
            <Grid item>
              <img
                className={image}
                alt={"Mytinerary log"}
                src={mytineraryLogo}
              />
            </Grid>
            <Grid item>
              <Typography
                className={title}
                align="left"
                variant="h3"
                color="primary"
                component="h1"
              >
                Find your perfect trip
              </Typography>
              <Typography
                align="left"
                variant="h4"
                color="textSecondary"
                component="h2"
              >
                Designed by insiders who know and love their cities.
              </Typography>
            </Grid>
            <Grid
              spacing={1}
              direction="row"
              justify="flex-start"
              container
              item
            >
              <Grid item>
                <Link to="/cities">
                  <Button variant="text" size="large" color="primary">
                    browse cities
                  </Button>
                </Link>
              </Grid>
              <Grid item>
                <Link to="/register">
                  <Button size="large" variant="contained" color="primary">
                    sign up
                  </Button>
                </Link>
              </Grid>
            </Grid>
          </Grid>
          <Grid xs={6} alignItems="center" container item>
            <Grid xs={11} item>
              <img
                className={image}
                src={HeroImg}
                alt="person next to a globe"
              />
            </Grid>
          </Grid>
        </Grid>
      ) : (
        <Grid
          container
          spacing={2}
          wrap="nowrap"
          justify="space-between"
          direction="column"
          className={landingSection}
          component="section"
        >
          <Grid xs item>
            <img
              className={image}
              alt={"Mytinerary log"}
              src={mytineraryLogo}
            />
          </Grid>
          <Grid xs justify="center" container item>
            <Grid xs={11} item>
              <img
                className={image}
                src={HeroImg}
                alt="person next to a globe"
              />
            </Grid>
          </Grid>
          <Grid xs item>
            <Typography
              className={title}
              align="center"
              variant="h5"
              color="primary"
              component="h1"
            >
              Find your perfect trip
            </Typography>
            <Typography
              align="center"
              variant="subtitle1"
              color="textSecondary"
              component="h2"
            >
              Designed by insiders who know and love their cities.
            </Typography>
          </Grid>
          <Grid
            xs
            spacing={1}
            direction="column"
            justify="space-between"
            container
            item
          >
            <Grid item>
              <Link to="/register">
                <Button className={button} variant="contained" color="primary">
                  sign up
                </Button>
              </Link>
            </Grid>
            <Grid item>
              <Link to="/cities">
                <Button variant="text" className={button} color="primary">
                  browse cities
                </Button>
              </Link>
            </Grid>
          </Grid>
        </Grid>
      )}
    </Container>
  );
}

export default Landing;
