import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles(({ breakpoints }) => ({
  container: {
    width: "100%",
    height: "200px",
    display: "flex",
    position: "relative",
    [breakpoints.up("sm")]: {
      height: "calc(250px)"
    }
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    background: "#e3e3e3",
    objectPosition: "center"
  },
  info: {
    color: "white",
    background: "rgba(0,0,0,0.8)",
    position: "absolute",
    padding: "5px 15px",
    bottom: 0,
    left: 0,
    right: 0,
    display: "flex",
    flexDirection: "row",
    alignItems: "baseline",
    justifyContent: "space-between"
  },
  countryClass: {
    opacity: 0.75
  }
}));
