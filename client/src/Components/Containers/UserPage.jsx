import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { getLoggedInUserData } from "../../Redux/Actions/userActions";
import genericPfp from "../../Images/generic-user.svg";
import styles from "../../Styles/user.module.css";
import LoadingRing from "../LoadingRing";
import Button from "../Button";

function UserPage(props) {
  const userData = useSelector((state) => state.user.userData);
  const isFetchingUserLoggedIn = useSelector(
    (state) => state.user.isFetchingUserLoggedIn
  );
  const loggedInUser = useSelector((state) => state.user.currentlyLoggedInUser);
  const userID = props.match.params.user;
  const currentUser = userID === loggedInUser;
  const [userImage, setUserImage] = useState("");
  const [user, setUser] = useState({});
  const imageUpload = useRef();
  const dispatch = useDispatch();
  const [isImageChanging, setIsImageChanging] = useState(false);

  useEffect(() => {
    if (currentUser) {
      const thereIsUserData = Object.keys(userData).length > 0;
      if (thereIsUserData) {
        document.title = `${userData.userName}'s Profile`;
        setUser(userData);
        if (userData.pfp.hasOwnProperty("data")) {
          const type = userData.pfp.type.split(".")[1];
          const imageData = Buffer.from(userData.pfp.data).toString("base64");
          setUserImage(`data:image/${type};base64,${imageData}`);
        }
      }
    } else {
      (async function () {
        await axios
          .get("http://localhost:5000/api/users/get/user/" + userID)
          .then(({ data }) => {
            document.title = `${data.userName}'s Profile`;
            setUser(data);
            if (data.pfp.hasOwnProperty("data")) {
              const type = data.pfp.type.split(".")[1];
              const imageData = Buffer.from(data.pfp.data).toString("base64");
              setUserImage(`data:image/${type};base64,${imageData}`);
            }
          })
          .catch((err) => console.log(err));
      })();
    }
    return () => setUser({});
  }, [userData, userID]);

  const changePfp = async (e) => {
    const image = e.target.files[0];
    const tenMB = 10000000;
    let data = new FormData();
    const config = {
      headers: { "content-type": "multipart/form-data" },
    };
    data.append("file", image, image.name);
    if (image.size < tenMB) {
      setIsImageChanging(true);
      await axios
        .put(
          "http://localhost:5000/api/users/user/pfp/" + userData._id,
          data,
          config
        )
        .then(() => {
          setIsImageChanging(false);
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
      {Object.keys(user).length > 0 ? (
        <>
          {!isImageChanging && !isFetchingUserLoggedIn ? (
            <>
              <img
                className={styles.userPfp}
                src={userImage || genericPfp}
              ></img>
              {currentUser ? (
                <>
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
                </>
              ) : (
                ""
              )}
            </>
          ) : (
            <LoadingRing centered />
          )}

          <h1 className={styles.userName}>{user.userName}</h1>

          <ul className={styles.userInfoList}>
            <li className={styles.userInfoList__item}>
              First name: {user.firstName}
            </li>
            <li className={styles.userInfoList__item}>
              Last name: {user.lastName}
            </li>
            <li className={styles.userInfoList__item}>
              country: {user.country}
            </li>
          </ul>
          {/* {currentUser ? (
            <Button
              text={"Delete Account"}
              onClick={deleteAccount}
              alert
              centered
            />
          ) : (
            ""
          )} */}
        </>
      ) : (
        <LoadingRing absoluteCentered />
      )}
    </>
  );
}

export default UserPage;
