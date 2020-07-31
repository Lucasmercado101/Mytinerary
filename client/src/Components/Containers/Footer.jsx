import React from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "../../Styles/footer.module.css";
import { Link } from "react-router-dom";
import { removeLastPageVisited } from "../../Redux/Actions/removeLastPageVisited";

function Footer() {
  const goBack = useSelector((state) => state.goBack["from"]);
  const dispatch = useDispatch();
  const areThereLinksToGoBackTo = goBack.length;

  return (
    <footer className={styles.footer}>
      {areThereLinksToGoBackTo ? (
        <Link
          className={styles.footer__link}
          to={goBack[goBack.length - 1]}
          onClick={() => dispatch(removeLastPageVisited())}
        >
          Back
        </Link>
      ) : (
        ""
      )}
      <Link to="/" className={styles.footer__link}>
        Home
      </Link>
    </footer>
  );
}

// add <p>Copyright &copy; 2020 by Mytinerary. All rights reserved.</p>
export default Footer;