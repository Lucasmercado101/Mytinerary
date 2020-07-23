import React, { useState, useEffect } from "react";
import axios from "axios";
import genericPfp from "../../Images/generic-user.svg";
import LoadingRing from "../LoadingRing";
import styles from "../../Styles/user.module.css";

function User(props) {
  const [userData, setUserData] = useState({});
  const [userImage, setUserImage] = useState("");

  useEffect(() => {
    (async function () {
      await axios
        .get(
          "http://localhost:5000/api/users/get/user/" + props.match.params.user
        )
        .then(({ data }) => {
          console.log(data);
          setUserData(data);
          if (data.pfp.hasOwnProperty("data")) {
            const type = data.pfp.type.split(".")[1];
            const imageData = Buffer.from(data.pfp.data).toString("base64");
            setUserImage(`data:image/${type};base64,${imageData}`);
          }
        })
        .catch((err) => console.log(err));
    })();
  }, []);

  return Object.keys(userData).length !== 0 ? (
    <>
      <img className={styles.userPfp} src={userImage || genericPfp}></img>
      <h1 className={styles.userName}>{userData.userName}</h1>
      <ul className={styles.userInfoList}>
        <li className={styles.userInfoList__item}>
          First name: {userData.firstName}
        </li>
        <li className={styles.userInfoList__item}>
          Last name: {userData.lastName}
        </li>
        <li className={styles.userInfoList__item}>
          country: {userData.country}
        </li>
      </ul>
    </>
  ) : (
    <div className={styles.loading}>
      <LoadingRing />
    </div>
  );
}

export default User;
