import React, { useEffect } from "react";
import style from "../Styles/notfound.module.css";

type Props = {
  thing?: string;
};

const NotFound: React.FC<Props> = ({ thing = "page" }) => {
  useEffect(() => {
    document.title = `${thing} not found`;
  }, [thing]);

  return <h1 className={style.text}>404: {thing} not found</h1>;
};

export default NotFound;
