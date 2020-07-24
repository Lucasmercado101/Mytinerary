import React, { useEffect } from "react";
import style from "../../Styles/notfound.module.css";

function NotFound() {
  useEffect(() => {
    document.title = "Page not found";
  }, []);

  return <h1 className={style.text}>404: page not found</h1>;
}

export default NotFound;
