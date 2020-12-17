import React from "react";
import { getPfp } from "../api";
import { useQuery } from "react-query";
import genericPfp from "../Images/generic-user.svg";
import MyLink from "./MyLink";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  card: {
    display: "flex",
    flexDirection: "column",
    position: "relative",
    textDecoration: "none",
    height: "175px",
    overflow: "hidden",
    borderRadius: "8px",
    margin: "15px 10px",
    boxShadow: "0 4px 8px 0 rgba(0,0,0,0.3)"
  },
  pfpStyle: {
    overflow: "hidden",
    height: "100%",
    position: "relative"
  },
  pfpImageStyle: {
    display: "block",
    objectFit: "cover",
    width: "100%",
    height: "100%",
    filter: "blur(.5px) brightness(50%)"
  },
  text: {
    position: "absolute",
    transform: "translate(-50%, -50%)",
    left: "50%",
    top: "50%",
    fontSize: "1.8rem",
    color: "white",
    backgroundImage:
      "linear-gradient(rgba(0, 0, 0, 0.65), rgba(0, 0, 0, 0.65))",
    borderRadius: "10px",
    padding: ".1rem .85rem",
    fontWeight: 400,
    fontFamily:
      "'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif"
  }
});

type Props = {
  userData: PublicUserData;
};

const UserCard: React.FC<Props> = ({ userData: { _id, pfp, username } }) => {
  const { card, pfpStyle, pfpImageStyle, text } = useStyles();
  const { data: pfpData } = useQuery(pfp, () => getPfp(pfp), {
    refetchOnMount: "always",
    refetchOnReconnect: "always",
    refetchOnWindowFocus: false
  });

  return (
    <MyLink className={card} to={"/users/user/" + _id}>
      <div className={pfpStyle}>
        <img
          className={pfpImageStyle}
          alt={username}
          src={pfpData || genericPfp}
        ></img>
        <h2 className={text}>{username}</h2>
      </div>
    </MyLink>
  );
};

export default UserCard;
