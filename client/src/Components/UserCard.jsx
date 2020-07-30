import React, { useEffect, useState } from "react";
import genericPfp from "../Images/generic-user.svg";
import axios from "axios";
import MyLink from "./MyLink";
import styles from "../Styles/userCard.module.css";

function UserCard({ user }) {
  const [pfp, setPfp] = useState();
  useEffect(() => {
    if (user.pfp) {
      axios
        .get(`http://localhost:5000/api/users/get/user/pfp/${user.pfp}`)
        .then((resp) => {
          const type = resp.data.type.split(".")[1];
          const data = Buffer.from(resp.data.data).toString("base64");
          setPfp(`data:image/${type};base64,${data}`);
        });
    }
  }, []);

  return (
    <MyLink className={styles.userCard} to={"/users/user/" + user._id}>
      <div className={styles.pfp}>
        <img className={styles.pfp__image} src={pfp || genericPfp}></img>
        <h2 className={styles.pfp__text}>{user.username}</h2>
      </div>
      <ul className={styles.detailsList}>
        <p className={styles.detailsList__item}>{user.firstName}</p>
        <p className={styles.detailsList__item}>{user.lastName}</p>
      </ul>
    </MyLink>
  );
}

export default UserCard;
