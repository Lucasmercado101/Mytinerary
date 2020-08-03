import React, { useEffect, useState } from "react";
import axios from "axios";
import genericPfp from "../Images/generic-user.svg";
import { getPfp } from "../api";
import MyLink from "./MyLink";
import styles from "../Styles/userCard.module.css";

function UserCard({ userData }) {
  const [pfp, setPfp] = useState();

  useEffect(() => {
    let isMounted = true;
    let source = axios.CancelToken.source();
    if (userData.pfp) {
      getPfp(userData.pfp, { cancelToken: source.token })
        .then((data) => {
          if (isMounted) setPfp(data);
        })
        .catch((err) => console.log(err));
    }
    return () => {
      isMounted = false;
      source.cancel();
    };
  }, [userData]);

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
      <ul className={styles.detailsList}>
        <p className={styles.detailsList__item}>{userData.firstName}</p>
        <p className={styles.detailsList__item}>{userData.lastName}</p>
      </ul>
    </MyLink>
  );
}

export default UserCard;
