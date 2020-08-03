import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { getUserPfp, deleteUser } from "../../Redux/Actions/userActions";
import { getUser, getPfp, deletePfp } from "../../api";
import { logOut } from "../../Redux/Actions/authActions";
import usePrevious from "../hooks/usePrevious";
import genericPfp from "../../Images/generic-user.svg";
import styles from "../../Styles/user.module.css";
import LoadingRing from "../LoadingRing";
import Button from "../Button";

function UserPage(props) {
  const userData = useSelector((state) => state.user.userData);
  const userPfp = useSelector((state) => state.user.userPfp);
  const isFetchingPfp = useSelector((state) => state.user.isFetchingPfp);
  const isDeletingUser = useSelector((state) => state.user.isDeletingUser);
  const prevIsDeletingUser = usePrevious(isDeletingUser);
  const userID = props.match.params.user;
  const currentUser = userID === userData._id;

  const [deleteImage, setDeleteImage] = useState(false);

  const [userImage, setUserImage] = useState("");
  const [user, setUser] = useState({});
  const [isImageChanging, setIsImageChanging] = useState(false);
  const [isRemovingImage, setIsRemovingImage] = useState(false);
  const imageUpload = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    let isMounted = true;
    let source = axios.CancelToken.source();

    if (!currentUser) {
      getUser(userID, { cancelToken: source.token })
        .then((fetchedUserData) => {
          if (isMounted) {
            setUser(fetchedUserData);
            if (fetchedUserData.pfp) {
              return getPfp(fetchedUserData.pfp, { cancelToken: source.token });
            }
          }
        })
        .then((image) => {
          if (isMounted) setUserImage(image);
        });
    }

    return () => {
      isMounted = false;
      source.cancel();
      setUser({});
      setUserImage("");
    };
  }, [currentUser, userID]);

  useEffect(() => {
    if (currentUser) {
      document.title = `${userData.username}'s Profile`;
      setUser(userData);
      setUserImage(userPfp);
    }
  }, [currentUser, userData, userPfp]);

  useEffect(() => {
    if ((isDeletingUser === false, prevIsDeletingUser === true)) {
      dispatch(logOut());
      props.history.push("/");
    }
  }, [isDeletingUser, prevIsDeletingUser, dispatch, props]);

  const changePfp = async (e) => {
    const image = e.target.files[0];
    const tenMB = 10000000;
    let data = new FormData();
    const config = {
      headers: {
        "content-type": "multipart/form-data",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    };
    data.append("file", image, image.name);
    //TODO: fix this so it doesn't set after component unmounts
    if (image.size < tenMB) {
      setIsImageChanging(true);
      if (userData.pfp) {
        // update pfp if there is one already
        await axios
          .put(
            "http://localhost:5000/api/users/user/pfp/" + userData.pfp,
            data,
            config
          )
          .then(() => {
            setIsImageChanging(false);
            dispatch(getUserPfp(userData.pfp));
          })
          .catch((err) => console.log(err));
      } else {
        // create one if there isn't
        await axios
          .post(
            "http://localhost:5000/api/users/user/pfp/" + userData._id,
            data,
            config
          )
          .then((resp) => {
            setIsImageChanging(false);
            dispatch({ type: "SET_USER_DATA", payload: resp.data });
            dispatch(getUserPfp(resp.data.pfp));
            // Fix this so that it it gets the pfp
            // using the userdata that was UPDATED
            // with the dispatch above, does not get latest state for some reason
            // dispatch(getPfp(userData.pfp));
          })
          .catch((err) => console.log(err));
      }
    } else {
      alert("File is too big");
    }
  };

  useEffect(() => {
    let isMounted = true;

    if (deleteImage) {
      setIsRemovingImage(true);
      deletePfp(userID)
        .then((resp) => {
          dispatch({ type: "CLEAR_PFP" });
          dispatch({ type: "SET_USER_DATA", payload: resp });
          if (isMounted) setIsRemovingImage(false);
        })
        .catch((err) => console.log(err))
        .finally(() => {
          if (isMounted) setDeleteImage(false);
        });
    }
    return () => (isMounted = false);
  }, [deleteImage]);

  return (
    <>
      {Object.keys(user).length > 0 ? (
        <>
          {!isImageChanging && !isFetchingPfp ? (
            <>
              <img
                alt={user.username}
                className={styles.userPfp}
                src={userImage || genericPfp}
              ></img>
            </>
          ) : (
            <LoadingRing centered />
          )}

          {currentUser ? (
            <>
              <Button
                onClick={() => imageUpload.current.click()}
                text={
                  userPfp ? "Change profile picture" : "Add profile picture"
                }
                centered
                disabled={
                  !(!isImageChanging && !isFetchingPfp) || isDeletingUser
                }
              />
              {userPfp ? (
                <Button
                  onClick={() => setDeleteImage(true)}
                  text={"Remove profile picture"}
                  centered
                  warning
                  disabled={isRemovingImage || deleteImage || isImageChanging}
                  // disabled={
                  //       isRemovingImage ||
                  //       !(!isImageChanging && !isFetchingPfp) ||
                  //       isDeletingUser
                  //     }
                />
              ) : (
                ""
              )}
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
          {currentUser ? (
            <Button
              text={"Delete Account"}
              onClick={() => dispatch(deleteUser(userData._id))}
              danger
              centered
              disabled={isDeletingUser || isImageChanging}
            />
          ) : (
            ""
          )}
        </>
      ) : (
        <LoadingRing absoluteCentered />
      )}
    </>
  );
}

export default UserPage;
