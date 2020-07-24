import React from "react";
import genericPfp from "../Images/generic-user.svg";
import MyLink from "./MyLink";
import styles from "../Styles/userCard.module.css";

function UserCard({ user }) {
  let imageData = "";

  if (user.pfp.hasOwnProperty("type")) {
    const type = user.pfp.type.split(".")[1];
    const data = Buffer.from(user.pfp.data).toString("base64");
    imageData = `data:image/${type};base64,${data}`;
  }

  return (
    <MyLink className={styles.userCard} to={"/users/user/" + user._id}>
      <div className={styles.pfp}>
        <img className={styles.pfp__image} src={imageData || genericPfp}></img>
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
