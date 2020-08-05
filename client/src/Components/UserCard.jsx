import React, { useEffect, useState } from "react";
import axios from "axios";
import genericPfp from "../Images/generic-user.svg";
import { getPfp } from "../api";
import MyLink from "./MyLink";
import styles from "../Styles/userCard.module.css";

function UserCard({ userData }) {
  const [pfp, setPfp] = useState();

  useEffect(() => {
    console.log(userData);
    //   let isMounted = true;
    //   let source = axios.CancelToken.source();
    //   if (userData.pfp) {
    //     getPfp(userData.pfp, { cancelToken: source.token })
    //       .then((data) => {
    //         if (isMounted) setPfp(data);
    //       })
    //       .catch(() => {});
    //   }
    //   return () => {
    //     isMounted = false;
    //     source.cancel();
    //   };
  }, [userData]);

  return (
    <MyLink className={styles.userCard} to={"/users/user/" + userData._id}>
      <div className={styles.pfp}>
        <img
          className={styles.pfp__image}
          alt={userData.username}
          src={userData.pfpData || genericPfp}
        ></img>
        <h2 className={styles.pfp__text}>{userData.username}</h2>
      </div>
    </MyLink>
  );
}

export default UserCard;
