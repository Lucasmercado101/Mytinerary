import React, { CSSProperties } from "react";
import MyLink from "../MyLink";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  cityCard: {
    width: "100%",
    height: "150px",
    backgroundColor: "black",
    position: "relative"
  },
  image: {
    filter: "brightness(50%) blur(.5px)",
    width: "100%",
    height: "100%",
    objectFit: "cover",
    transition: ".2s all"
  },
  cityInfo: {
    position: "absolute",
    display: "flex",
    fontSize: "1.8rem",
    flexDirection: "column",
    color: "white",
    textDecoration: "none",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)"
  },
  cityName: {
    color: "white",
    whiteSpace: "nowrap"
  },
  countryStyle: {
    color: "white",
    textAlign: "center",
    fontSize: "0.8rem"
  }
});

type Props = {
  url: string;
  city: string;
  country: string;
  style?: CSSProperties;
  link?: boolean;
};

const City: React.FC<Props> = ({ style, url, city, country, link }) => {
  const { cityCard, image, cityInfo, cityName, countryStyle } = useStyles();

  return (
    <div style={style || undefined} className={cityCard}>
      <img src={url} className={image} alt={city} />
      {link ? (
        <MyLink to={`/cities/${city}`} className={cityInfo}>
          <p className={cityName}>{city}</p>
          <small className={countryStyle}>{country}</small>
        </MyLink>
      ) : (
        <div className={cityInfo}>
          <p className={cityName}>{city}</p>
          <small className={countryStyle}>{country}</small>
        </div>
      )}
    </div>
  );
};

export default City;
