import React, { useState } from "react";
import "../Styles/footer.css";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer>
      <Link>Back</Link>
      <Link to="/">Home</Link>
    </footer>
  );
}

//<p>Copyright &copy; 2020 by Mytinerary. All rights reserved.</p>
export default Footer;
