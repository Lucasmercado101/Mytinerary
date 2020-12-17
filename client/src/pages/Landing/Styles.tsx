import { makeStyles } from "@material-ui/core/styles";

type Props = {
  imageUrl?: string;
};

const useStyles = makeStyles({
  hero: (props: Props) => ({
    backgroundPosition: "center",
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url("${props.imageUrl}")`,
    backgroundSize: "cover",
    display: "flex",
    height: "calc(100vh - 2.8rem)",
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignItems: "center"
  }),
  logoImg: {
    width: "85%",
    userSelect: "none"
  },
  title: {
    fontWeight: 300,
    fontSize: "1.8rem",
    color: "white",
    width: "85%"
  },
  browseArrow: {
    display: "block",
    margin: "auto",
    width: "50%",
    userSelect: "none"
  },
  section: {
    paddingTop: "25px",
    paddingBottom: "55px"
  },
  h2: {
    textAlign: "center",
    fontWeight: 400,
    marginBottom: "25px"
  }
});

export default useStyles;
