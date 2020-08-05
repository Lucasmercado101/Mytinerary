import React, { useEffect } from "react";
import { getPfp } from "../api";
import { useFetch } from "./hooks/useFetch";
import genericPfp from "../Images/generic-user.svg";
import MyLink from "./MyLink";
import styles from "../Styles/userCard.module.css";

//TODO Make this a PRESENTATIONAL component, no state or logic
function UserCard({ userData }) {
  const [pfp, , , fetchPfp] = useFetch(getPfp, "");

  useEffect(() => userData.pfp && fetchPfp(userData.pfp), [userData]);

  return (
    <MyLink className={styles.userCard} to={"/users/user/" + userData._id}>
      <div className={styles.pfp}>
        <img
          className={styles.pfp__image}
          alt={userData.username}
          src={pfp || genericPfp}
        ></img>
        <h2 className={styles.pfp__text}>{userData.username}</h2>
      </div>
    </MyLink>
  );
}

export default UserCard;
