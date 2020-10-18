import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles(({ breakpoints }) => ({
  container: {
    padding: 20,
    [breakpoints.up("sm")]: {
      padding: "25px"
    }
  },
  title: {
    textAlign: "center"
  },
  searchBar: {
    marginTop: "10px",
    marginBottom: "25px",
    width: "100%"
  },
  citiesList: {
    listStyle: "none",
    margin: 0,
    padding: 0,
    width: "100%"
  },
  newCityButton: {
    marginTop: 15
  }
}));
