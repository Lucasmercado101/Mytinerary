import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { removeLastPageVisited } from "../Redux/Actions/lastPage";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  footerStyle: {
    width: "100%",
    height: "2.8rem",
    minHeight: "2.8rem",
    backgroundColor: "#3a3a3a",
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center"
  },
  linkStyle: {
    textAlign: "center",
    fontSize: "1.1rem",
    color: "#ffffff",
    textDecoration: "none"
  }
});

const Footer: React.FC = () => {
  const { footerStyle, linkStyle } = useStyles();
  const goBack = useSelector((state: any) => state.goBack["from"]); //Todo: properly fix this
  const dispatch = useDispatch();
  const areThereLinksToGoBackTo = goBack.length;

  return (
    <footer className={footerStyle}>
      {areThereLinksToGoBackTo ? (
        <Link
          className={linkStyle}
          to={goBack[goBack.length - 1]}
          onClick={() => dispatch(removeLastPageVisited())}
        >
          Back
        </Link>
      ) : (
        ""
      )}
      <Link to="/" className={linkStyle}>
        Home
      </Link>
    </footer>
  );
};

export default Footer;
