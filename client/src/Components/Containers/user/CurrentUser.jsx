import React, { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { getLoggedInUserData } from "../../../Redux/Actions/getLoggedInUserData";
import genericPfp from "../../../Images/generic-user.svg";
import styles from "../../../Styles/user.module.css";
import useUserPfp from "../../hooks/useUserPfp";
import Button from "../../Button";

function CurrentUser() {
  const userData = useSelector((state) => state.user.userData);
  const userPfp = useUserPfp();
  const dispatch = useDispatch();

  useEffect(() => {
    document.title = `${userData.username}'s Profile`;
  }, [userData]);

  const imageUpload = useRef();

  const changePfp = async (e) => {
    const image = e.target.files[0];
    const tenMB = 10000000;
    let data = new FormData();
    const config = {
      headers: { "content-type": "multipart/form-data" },
    };
    data.append("file", image, image.name);
    if (image.size < tenMB) {
      await axios
        .put(
          "http://localhost:5000/api/users/user/pfp/" + userData._id,
          data,
          config
        )
        .then((res) => {
          dispatch(getLoggedInUserData(userData._id));
        })
        .catch((err) => console.log(err));
    } else {
      alert("File is too big");
    }
  };

  const deleteAccount = async () => {
    // Delete account along with all posts and comments
  };

  return (
    <>
      <img className={styles.userPfp} src={userPfp || genericPfp}></img>
      <Button
        onClick={() => imageUpload.current.click()}
        text={"Change profile picture"}
        centered
      />
      <small style={{ textAlign: "center", display: "block" }}>
        Image must be smaller than 10MB
      </small>
      <input
        style={{ display: "none" }}
        type="file"
        name="profilePic"
        id="profilePic"
        ref={imageUpload}
        onChange={changePfp}
        accept="image/*"
      />
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
      <Button text={"Delete Account"} onClick={deleteAccount} alert centered />
    </>
  );
}

export default CurrentUser;
