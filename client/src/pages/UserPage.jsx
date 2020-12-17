import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import { useFetch } from "../Components/hooks/useFetch";
import { getUser, getPfp } from "../api";
import { useSelector, useDispatch } from "react-redux";
import {
  changePfp,
  getUserPfp,
  deletePfp,
  addPfp,
  justChangedPfp,
  deleteUser
} from "../Redux/Actions/user";
import styles from "../Styles/user.module.css";
import genericPfp from "../Images/generic-user.svg";
import Button from "../Components/Button";

import NotFound from "./NotFound";
import LoadingRing from "../Components/LoadingRing";

function UserPage(props) {
  const userData = useSelector((state) => state.user.userData);
  const userPfp = useSelector((state) => state.user.userPfp);
  const userPageID = props.match.params.user;
  const sameUser = userPageID === userData._id;

  const [userPageData, setUserPageData] = useState({});
  const [fetchedUserData, error, isFetching, fetchUserData] = useFetch(
    getUser,
    {},
    false
  );
  const [fetchedPfpData, , isFetchingPfp, fetchPfp] = useFetch(getPfp, "");

  useLayoutEffect(() => {
    if (sameUser) {
      const newUserData = { ...userData };
      delete newUserData.pfp;
      setUserPageData({
        ...newUserData,
        pfpData: userPfp,
        hasPfp: userData.pfp ? true : false,
        pfpID: userData.pfp
      });
    } else {
      fetchUserData(userPageID);
    }
    return () => setUserPageData({});
  }, [fetchUserData, userPageID, userData, sameUser, userPfp]);

  useEffect(() => {
    if (Object.keys(fetchedUserData).length > 0) {
      setUserPageData(fetchedUserData);
    }
  }, [fetchedUserData]);

  useEffect(() => {
    if (userPageData.pfp) {
      fetchPfp(userPageData.pfp);
    }
  }, [userPageData.pfp, fetchPfp]);

  useEffect(() => {
    if (fetchedPfpData && !isFetching && !sameUser) {
      setUserPageData((i) => {
        return { ...i, pfpData: fetchedPfpData };
      });
    }
  }, [fetchedPfpData, isFetching, sameUser]);

  useEffect(() => {
    document.title = `${userPageData.username}'s profile`;
  }, [userPageData]);

  useEffect(() => {
    let isMounted = true;
    if (error) {
      if (isMounted) {
        alert(error.response.statusText);
      }
    }
    return () => (isMounted = false);
  }, [error]);

  return (
    <>
      {!isFetching ? (
        Object.keys(userPageData).length > 0 ? (
          <>
            {!isFetchingPfp ? (
              <>
                <img
                  alt={userPageData.username}
                  className={styles.userPfp}
                  src={userPageData.pfpData || genericPfp}
                ></img>
              </>
            ) : (
              <LoadingRing centered />
            )}
            {sameUser && (
              <>
                <ChangeProfilePictureButton userData={userPageData} />
                {userData.pfp && (
                  <DeleteProfilePictureButton userData={userPageData} />
                )}
              </>
            )}

            <h1 className={styles.userName}>{userPageData.userName}</h1>

            <ul className={styles.userInfoList}>
              <li className={styles.userInfoList__item}>
                First name: {userPageData.firstName}
              </li>
              <li className={styles.userInfoList__item}>
                Last name: {userPageData.lastName}
              </li>
              <li className={styles.userInfoList__item}>
                country: {userPageData.country}
              </li>
              {userPageData.email && (
                <li className={styles.userInfoList__item}>
                  email: {userPageData.email}
                </li>
              )}
            </ul>

            {sameUser && <DeleteAccountButton ID={userPageData._id} />}
          </>
        ) : (
          <NotFound thing={"User"} />
        )
      ) : (
        <LoadingRing absoluteCentered />
      )}
    </>
  );
}

function ChangeProfilePictureButton({ userData }) {
  const isDeletingUser = useSelector((state) => state.user.isDeletingUser);
  const isChangingPfp = useSelector((state) => state.changingPfp.isChangingPfp);
  const isAddingPfp = useSelector((state) => state.addingPfp.isAddingPfp);
  const isDeletingPfp = useSelector((state) => state.user.isDeletingPfp);
  const imageUpload = useRef();
  const dispatch = useDispatch();

  const changeUserPfp = async (e) => {
    const image = e.target.files[0];
    const tenMB = 10000000;
    if (image.size < tenMB) {
      const data = new FormData();
      data.append("file", image, image.name);
      userData.hasPfp
        ? dispatch(changePfp(userData.pfpID, data))
            .then(() => dispatch(getUserPfp(userData.pfpID)))
            .catch((err) => alert(`Changing profile picture error: ${err}`))
        : dispatch(addPfp(userData._id, data))
            .then(() => dispatch(justChangedPfp(userData._id)))
            .catch((err) => alert(`Adding profile picture error: ${err}`));
    } else {
      alert("File is too big");
    }
  };

  return (
    <>
      <input
        style={{ display: "none" }}
        type="file"
        name="profilePic"
        id="profilePic"
        ref={imageUpload}
        onChange={changeUserPfp}
        accept="image/*"
      />
      <Button
        onClick={() => imageUpload.current.click()}
        text={
          userData.hasPfp ? "Change profile picture" : "Add profile picture"
        }
        centered
        disabled={
          isDeletingUser || isChangingPfp || isDeletingPfp || isAddingPfp
        }
      />
      <small style={{ textAlign: "center", display: "block" }}>
        Image must be smaller than 10MB
      </small>
    </>
  );
}

function DeleteProfilePictureButton({ userData }) {
  const isDeletingUser = useSelector((state) => state.user.isDeletingUser);
  const isChangingPfp = useSelector((state) => state.changingPfp.isChangingPfp);
  const isDeletingPfp = useSelector((state) => state.user.isDeletingPfp);
  const dispatch = useDispatch();

  function removePfp() {
    dispatch(deletePfp(userData.pfpID)).catch((err) =>
      alert(`Deleting profile picture error: ${err}`)
    );
  }

  return (
    <Button
      text={"Remove profile picture"}
      onClick={removePfp}
      warning
      centered
      disabled={isDeletingUser || isChangingPfp || isDeletingPfp}
    />
  );
}

function DeleteAccountButton({ ID }) {
  const isDeletingUser = useSelector((state) => state.user.isDeletingUser);
  const isChangingPfp = useSelector((state) => state.changingPfp.isChangingPfp);
  const isDeletingPfp = useSelector((state) => state.user.isDeletingPfp);
  const isAddingPfp = useSelector((state) => state.addingPfp.isAddingPfp);
  const dispatch = useDispatch();

  return (
    <Button
      text={"Delete Account"}
      onClick={() => dispatch(deleteUser(ID))}
      danger
      centered
      disabled={isDeletingUser || isChangingPfp || isDeletingPfp || isAddingPfp}
    />
  );
}

export default UserPage;
