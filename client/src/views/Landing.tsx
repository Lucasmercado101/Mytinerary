import React, { useEffect } from "react";
import mytineraryLogo from "../Images/mytinerary_logo.svg";
import { Link } from "react-router-dom";
import heroMobileImage from "../Images/heromobile.svg";
import heroDesktop from "../Images/herodesktop.svg";
import {
  Grid,
  makeStyles,
  Button,
  Typography,
  Container,
  useTheme,
  useMediaQuery
} from "@material-ui/core";
import HeroImg from "../Images/hero.svg";
// import Slider from "react-animated-slider";

const useStyles = makeStyles(({ breakpoints }) => ({
  landingPage: {
    height: "100%",
    width: "100%",
    padding: 25,
    overflowX: "hidden"
  },
  mainLogo: {
    width: "100%",
    height: "100%",
    maxWidth: 400,
    [breakpoints.up("sm")]: {
      height: "100%",
      width: "100%",
      maxWidth: 500
    }
  },
  mobileLogo: {
    height: "100%",
    position: "relative",
    transform: "scale(1.2) translateY(-5%)",
    maxWidth: 400,
    zIndex: -1
  },
  mobileLogoRight: {
    height: "100%",
    position: "relative",
    transform: "scale(1.2) translate(10%, -5%)",
    maxWidth: 400,
    zIndex: -1,
    [breakpoints.up("md")]: {
      maxWidth: 700
    }
  },
  button: { width: "100%" }
}));

function Landing() {
  const theme = useTheme();
  const tabletAndBigger = useMediaQuery(theme.breakpoints.up("sm"));
  const {
    landingPage,
    mainLogo,
    button,
    mobileLogo,
    mobileLogoRight
  } = useStyles();

  useEffect(() => {
    document.title = "Mytinerary";
  }, []);
  return (
    <div className={landingPage}>
      <Grid container style={{ height: "100%" }} direction="row">
        <Grid
          xs={12}
          sm={8}
          md={6}
          style={{ height: "100%" }}
          justify="center"
          alignItems="center"
          alignContent={`${tabletAndBigger ? "center" : "space-between"}`}
          direction="row"
          item
          container
          spacing={tabletAndBigger ? 6 : 2}
        >
          <Grid container justify="center" xs={12} sm={12} item>
            <Grid item>
              <img
                className={mainLogo}
                src={mytineraryLogo}
                alt="mytinerary logo"
              />
            </Grid>
          </Grid>
          {!tabletAndBigger && (
            <Grid container justify="center" xs={12} item>
              <Grid item>
                <img
                  className={mobileLogo}
                  src={heroMobileImage}
                  alt="man holding a backpack near a globe"
                />
              </Grid>
            </Grid>
          )}
          <Grid
            container
            justify="center"
            alignItems="center"
            direction="column"
            item
            xs={12}
          >
            <Grid xs sm={12} item>
              <Typography
                align={`${tabletAndBigger ? "left" : "center"}`}
                color="primary"
                variant="h5"
                component="h1"
              >
                Find Your Perfect Trip
              </Typography>
            </Grid>
            <Grid xs item>
              <Typography
                align={`${tabletAndBigger ? "left" : "center"}`}
                variant="subtitle1"
                component="h2"
                color="textSecondary"
              >
                Designed by insiders who know and love their cities
              </Typography>
            </Grid>
          </Grid>
          <Grid
            spacing={2}
            alignItems="center"
            container
            direction="column"
            item
            xs={10}
            sm={12}
          >
            <Grid
              xs={12}
              lg={4}
              direction={`${tabletAndBigger ? "row" : "column"}`}
              item
            >
              <Button
                component={Link}
                to="/register"
                className={button}
                color="primary"
                variant="contained"
              >
                sign up
              </Button>
            </Grid>
            <Grid xs={12} lg={4} item>
              <Button
                component={Link}
                to="/cities"
                className={button}
                color="primary"
                variant="text"
              >
                browse cities
              </Button>
            </Grid>
          </Grid>
        </Grid>
        {tabletAndBigger && (
          <Grid container justify="center" sm={4} md={6} item>
            <Grid md item>
              <img
                className={mobileLogoRight}
                src={heroDesktop}
                alt="man holding a backpack near a globe"
              />
            </Grid>
          </Grid>
        )}
      </Grid>
    </div>
  );
}

export default Landing;
