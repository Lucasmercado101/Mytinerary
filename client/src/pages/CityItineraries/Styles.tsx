import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  title: {
    textAlign: "center",
    fontWeight: 500,
    margin: "0.8rem 0"
  },
  itinerariesStyle: {
    listStyle: "none",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    alignItems: "start"
  }
});

export default useStyles;
