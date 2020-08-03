import React, { useState, useEffect, useRef } from "react";
import { getUser, getPfp, addPfp, deletePfp, changePfp } from "../../api";
import { useSelector, useDispatch } from "react-redux";
import { getUserPfp } from "../../Redux/Actions/userActions";
import genericPfp from "../../Images/generic-user.svg";
import axios from "axios";
import NotFound from "./NotFound";
import styles from "../../Styles/user.module.css";
import LoadingRing from "../LoadingRing";
import Button from "../Button";

function UserPage(props) {
  const userData = useSelector((state) => state.user.userData);
  const userPfp = useSelector((state) => state.user.userPfp);

  const [isRemovingPfp, setIsRemovingPfp] = useState(false);
  const [isChangingPfp, setIsChangingPfp] = useState(false);
  const [isFetchingUserData, setIsFetchingUserData] = useState(true);
  const [userFound, setUserFound] = useState(false);
  const [fetchedUserData, setfetchedUserData] = useState({});
  const userPageID = props.match.params.user;
  const sameUser = userPageID === userData._id;

  useEffect(() => {
    let isMounted = true;
    let source = axios.CancelToken.source();

    if (!sameUser) {
      getUser(userPageID, { cancelToken: source.token })
        .then((fetchedUser) => {
          if (isMounted) {
            document.title = `${fetchedUser.username}'s Profile`;
            setfetchedUserData(fetchedUser);
            setUserFound(true);
          }
        })
        .catch(() => {})
        .finally(() => {
          if (isMounted) {
            setIsFetchingUserData(false);
          }
        });
    }

    return () => {
      isMounted = false;
      source.cancel();
      setUserFound(true);
      setIsFetchingUserData(true);
      setfetchedUserData({});
    };
  }, [userPageID, sameUser]);

  useEffect(() => {
    if (sameUser) {
      document.title = `${userData.username}'s Profile`;
      setIsFetchingUserData(false);
      setfetchedUserData(userData);
      setUserFound(true);
    }
  }, [sameUser, userPfp, userData]);

  return (
    <>
      {!isFetchingUserData ? (
        userFound ? (
          <>
            <UserProfilePic userData={fetchedUserData} />
            {sameUser ? (
              <>
                <ChangePfpButton
                  isRemovingPfp={isRemovingPfp}
                  setIsChangingPfp={setIsChangingPfp}
                />
                <small style={{ textAlign: "center", display: "block" }}>
                  Image must be smaller than 10MB
                </small>
                {userPfp ? (
                  <RemovePfp
                    setIsRemovingPfp={setIsRemovingPfp}
                    isChangingPfp={isChangingPfp}
                  />
                ) : (
                  ""
                )}
              </>
            ) : (
              ""
            )}
            <h1 className={styles.userName}>{fetchedUserData.userName}</h1>

            <ul className={styles.userInfoList}>
              <li className={styles.userInfoList__item}>
                First name: {fetchedUserData.firstName}
              </li>
              <li className={styles.userInfoList__item}>
                Last name: {fetchedUserData.lastName}
              </li>
              <li className={styles.userInfoList__item}>
                country: {fetchedUserData.country}
              </li>
            </ul>
            {/* {sameUser ? <DeletePfp /> : ""} */}
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

function UserProfilePic({ userData: user }) {
  const userData = useSelector((state) => state.user.userData);
  const userPfp = useSelector((state) => state.user.userPfp);
  const isFetchingPfp = useSelector((state) => state.user.isFetchingPfp);
  const [pfpData, setPfpData] = useState("");
  const [isFetchingPfpData, setIsFetchingPfpData] = useState(true);

  useEffect(() => {
    let isMounted = true;
    let source = axios.CancelToken.source();
    if (!userData.pfp && !userPfp) {
      if (user.pfp) {
        getPfp(user.pfp, { cancelToken: source.token })
          .then((pfpData) => {
            if (isMounted) {
              setPfpData(pfpData);
            }
          })
          .catch(() => {})
          .finally(() => {
            if (isMounted) {
              setIsFetchingPfpData(false);
            }
          });
      } else {
        if (isMounted) {
          setPfpData(genericPfp);
          setIsFetchingPfpData(false);
        }
      }
    } else if (userData.pfp && !userPfp) {
      setIsFetchingPfpData(true);
      setPfpData(genericPfp);
    } else {
      if (userPfp) {
        setPfpData(userPfp);
        setIsFetchingPfpData(false);
      }
    }

    return () => {
      isMounted = false;
      source.cancel();
    };
  }, [user, userData.pfp, userPfp]);

  return (
    <>
      {!isFetchingPfpData && !isFetchingPfp ? (
        <>
          <img
            alt={user.username}
            className={styles.userPfp}
            src={pfpData}
          ></img>
        </>
      ) : (
        <LoadingRing centered />
      )}
    </>
  );
}

function ChangePfpButton({
  isRemovingPfp,
  setIsChangingPfp: changingProfilePic,
}) {
  const userData = useSelector((state) => state.user.userData);
  const imageUpload = useRef();
  const dispatch = useDispatch();
  const [imageUploaded, setImageUploaded] = useState();
  const [isChangingPfp, setIsChangingPfp] = useState(false);
  const [gonnaChangePfp, setGonnaChangePfp] = useState(false);

  useEffect(() => {
    let isMounted = true;
    if (gonnaChangePfp) {
      changingProfilePic(true);
      dispatch({ type: "CLEAR_PFP" });
      if (userData.pfp) {
        console.log(imageUploaded);
        changePfp(userData.pfp, imageUploaded)
          .then(() => {
            if (isMounted) {
              dispatch(getUserPfp(userData.pfp));
              setIsChangingPfp(false);
              setGonnaChangePfp(false);
              changingProfilePic(false);
            }
          })
          .catch(() => {});
      } else {
        addPfp(userData._id, imageUploaded)
          .then(() => getUser(userData._id))
          .then((resp) => {
            dispatch({
              type: "SET_USER_DATA",
              payload: { ...userData, pfp: resp.pfp },
            });
            dispatch(getUserPfp(userData.pfp));
            if (isMounted) {
              setIsChangingPfp(false);
              setGonnaChangePfp(false);
              changingProfilePic(false);
            }
          })
          .catch(() => {});
      }
    }
    return () => {
      isMounted = false;
    };
  }, [gonnaChangePfp, imageUploaded, dispatch, userData]);

  const changeUserPfp = async (e) => {
    const image = e.target.files[0];
    const tenMB = 10000000;
    if (image.size < tenMB) {
      const data = new FormData();
      data.append("file", image, image.name);
      setImageUploaded(data);
      setIsChangingPfp(true);
      setGonnaChangePfp(true);
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
        text={userData.pfp ? "Change profile picture" : "Add profile picture"}
        centered
        disabled={isChangingPfp || isRemovingPfp}
      />
    </>
  );
}

function RemovePfp({
  setIsRemovingPfp: setIsRemovingProfilePic,
  isChangingPfp,
}) {
  const userData = useSelector((state) => state.user.userData);
  const [isRemoving, setIsRemoving] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    let isMounted = true;
    if (isRemoving) {
      setIsRemoving(true);
      deletePfp(userData.pfp)
        .then(() => {
          dispatch({ type: "CLEAR_PFP" });
          delete userData.pfp;
          dispatch({ type: "SET_USER_DATA", payload: { ...userData } });
          if (isMounted) {
            setIsRemovingProfilePic(false);
            setIsRemoving(false);
          }
        })
        .catch(() => {});
    }

    return () => {
      isMounted = false;
    };
  }, [isRemoving, userData]);

  function removeProfilePic() {
    setIsRemovingProfilePic(true);
    setIsRemoving(true);
  }

  return (
    <Button
      text={"Remove profile picture"}
      onClick={removeProfilePic}
      warning
      centered
      disabled={isRemoving || isChangingPfp}
    />
  );
}

export default UserPage;
