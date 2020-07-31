import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import MyLink from "./MyLink";
import useUserPfp from "./hooks/useUserPfp";
import {
  emptyItineraries,
  getItineraries,
} from "../Redux/Actions/itinerariesActions";
import styles from "../Styles/itinerary.module.css";
import clockIcon from "../Images/clock-icon.svg";
import likeIcon from "../Images/like-icon.svg";
import genericPfp from "../Images/generic-user.svg";
import deleteIcon from "../Images/delete.svg";

function Itinerary({
  title,
  time,
  rating,
  price,
  creator,
  hashtags,
  activities,
  id,
  currentCity,
}) {
  const userData = useSelector((state) => state.user.userData);
  const userPfp = useUserPfp();
  const dispatch = useDispatch();
  const isLoggedInUserItinerary = creator === userData._id;
  const [allActivities, setAllActivities] = useState([]);
  const [userName, setUserName] = useState("");
  const [userImage, setUserImage] = useState("");
  const [userPage, setUserPage] = useState("");

  const fetchActivities = async () => {
    await axios
      .get(`http://localhost:5000/api/activities/` + activities)
      .then((resp) => setAllActivities(resp.data.activities))
      .catch((err) => console.log(err));
  };

  const deleteItinerary = async () => {
    await axios
      .delete("http://localhost:5000/api/itineraries/", {
        params: {
          itineraryId: id,
          activitiesId: activities,
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then(() => {
        dispatch(getItineraries(currentCity));
        dispatch(emptyItineraries());
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    const source = axios.CancelToken.source();
    if (isLoggedInUserItinerary) {
      setUserName(userData.username);
      setUserPage(userData._id);
      setUserImage(userPfp);
    } else {
      (async function () {
        await axios
          .get("http://localhost:5000/api/itineraries/userPfp/" + creator, {
            cancelToken: source.token,
          })
          .then((resp) => {
            const { user, pfp } = resp.data;
            setUserName(user.username);
            setUserPage(user._id);
            if (pfp) {
              const type = pfp.type.split(".")[1];
              const imageData = Buffer.from(pfp.data).toString("base64");
              setUserImage(`data:image/${type};base64,${imageData}`);
            }
          })
          .catch((err) => console.log(err));
      })();
    }
    return () => {
      source.cancel();
    };
  }, [creator, userPfp, userData, isLoggedInUserItinerary]);

  return (
    <article className={styles.itinerary}>
      <header className={styles.header}>
        <MyLink to={"/users/user/" + userPage}>
          <img
            className={styles.header__photo}
            title={userName}
            src={userImage || genericPfp}
          />
        </MyLink>
        <h3 className={styles.header__title}>{title}</h3>
        {isLoggedInUserItinerary ? (
          <img
            className={styles.header__configure}
            src={deleteIcon}
            onClick={() => deleteItinerary()}
            title={`Delete '${title}'`}
            alt={`Delete '${title}'`}
          />
        ) : (
          ""
        )}
      </header>
      <section className={styles.description}>
        <p className={styles.description__item}>
          <object
            style={{ height: "1.2em", marginRight: "5px" }}
            data={likeIcon}
            type="image/svg+xml"
          />
          {rating}
        </p>
        <p className={styles.description__item}>
          <object
            style={{ height: "1.5em", marginRight: "5px" }}
            data={clockIcon}
            type="image/svg+xml"
          />
          {time}HS
        </p>
        <p className={styles.description__item}>{price}</p>
      </section>
      {hashtags.length > 0 ? (
        <section className={styles.hashtags}>
          {hashtags.map((hashtag, i) => (
            <p key={i}>#{hashtag}</p>
          ))}
        </section>
      ) : (
        ""
      )}
      <section>
        <details>
          <summary className={styles.viewMoreButton} onClick={fetchActivities}>
            View more
          </summary>
          <section className={styles.activities}>
            <h4 className={styles.activities__title}>Activities</h4>
            <ul>
              {allActivities.map((activity, i) => (
                <li key={i} className={styles.activities__activity}>
                  {activity}
                </li>
              ))}
            </ul>
          </section>
        </details>
      </section>
    </article>
  );
}

export default Itinerary;
