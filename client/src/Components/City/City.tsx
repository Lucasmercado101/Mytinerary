import { makeStyles, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import Skeleton from "@material-ui/lab/Skeleton";
import React from "react";

interface DataProps extends React.HTMLAttributes<HTMLElement> {
  name: string;
  country: string;
  imageUrl: string;
  loading?: never;
}
interface SkeletonProps extends React.HTMLAttributes<HTMLElement> {
  name?: never;
  country?: never;
  imageUrl?: never;
  loading: boolean;
}

type Props = DataProps | SkeletonProps;

const useStyles = makeStyles(() => ({
  container: {
    width: "100%",
    height: "175px",
    display: "flex",
    flexDirection: "column",
    position: "relative"
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    background: "#e3e3e3",
    objectPosition: "center"
  },
  info: {
    width: "100%",
    color: "white",
    background: "rgba(0,0,0,0.8)",
    position: "absolute",
    padding: "5px 15px",
    bottom: 0,
    left: 0,
    display: "flex",
    flexDirection: "row",
    alignItems: "baseline",
    justifyContent: "space-between"
  },
  nameClass: {
    marginRight: 5
  },
  countryClass: {
    color: "#ccc"
  }
}));

const City: React.FC<Props> = ({ name, country, imageUrl, loading }) => {
  const { container, image, info, nameClass, countryClass } = useStyles();
  if (loading)
    return (
      <div className={container}>
        <Skeleton variant="rect" width="100%" height="100%" />
      </div>
    );

  return (
    <Link to={`/cities/${name}`} className={container}>
      <img className={image} src={imageUrl} alt={name} />
      <div className={info}>
        <Typography className={nameClass} variant="subtitle1" component="h2">
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
