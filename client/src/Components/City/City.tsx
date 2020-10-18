import React from "react";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import Skeleton from "@material-ui/lab/Skeleton";
import Props from "./Props";
import { useStyles } from "./Styles";

const City: React.FC<Props> = ({ name, country, loading, cityId }) => {
  const { container, image, info, countryClass } = useStyles();
  if (loading)
    return (
      <div className={container}>
        <Skeleton variant="rect" width="100%" height="100%" />
      </div>
    );

  return (
    <Link to={`/cities/city/${cityId}`} className={container}>
      <img
        className={image}
        src={`https://source.unsplash.com/daily?${name
          ?.split(" ")
          .join("")},architecture`}
        alt={name}
      />
      <div className={info}>
        <Typography variant="subtitle1" component="h2">
          {name}
        </Typography>
        <Typography className={countryClass} variant="subtitle2" component="h3">
          {country}
        </Typography>
      </div>
    </Link>
  );
};

export default City;
