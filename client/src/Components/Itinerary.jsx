import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { getUser, getPfp } from "../api";
import axios from "axios";
import MyLink from "./MyLink";
import LoadingRing from "./LoadingRing";
import styles from "../Styles/itinerary.module.css";
import clockIcon from "../Images/clock-icon.svg";
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
  onDelete,
}) {
  const userData = useSelector((state) => state.user.userData);
  const userPfp = useSelector((state) => state.user.userPfp);
  const [isFetchingData, setIsFetchingData] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [itineraryUserData, setItineraryUserData] = useState({});
  const [showActivities, setShowActivities] = useState(false);
  const isLoggedInUserItinerary = creator === userData._id;

  //TODO: fetch pfpData on parent component, not here
  useEffect(() => {
    let isMounted = true;

    if (isLoggedInUserItinerary) {
      setIsFetchingData(false);
    } else {
      let fetchedUserData = {};
      getUser(creator)
        .then((user) => {
          fetchedUserData = { username: user.username, userPage: user._id };
          if (isMounted && user.pfp) return getPfp(user.pfp);
        })
        .then((pfp) => {
          if (isMounted) {
            fetchedUserData = {
              ...fetchedUserData,
              pfp,
            };
          }
        })
        .catch((err) => console.log(err))
        .finally(() => {
          if (isMounted) {
            setIsFetchingData(false);
            setItineraryUserData(fetchedUserData);
          }
        });
    }
    return () => {
      isMounted = false;
    };
  }, [isLoggedInUserItinerary, creator]);

  useEffect(() => {
    if (isLoggedInUserItinerary) {
      setItineraryUserData({
        username: userData.username,
        pfp: userPfp,
        userPage: userData._id,
      });
    }
  }, [userData, userPfp, isLoggedInUserItinerary]);

  const deleteItinerary = async () => {
    if (!deleting) {
      setDeleting(true);
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
          if (onDelete) onDelete();
        })
        .catch((err) => {
          setDeleting(false);
          console.log(err);
        });
    }
  };

  return (
    <article className={styles.itinerary}>
      {isFetchingData ? (
        <LoadingRing centered />
      ) : (
        <>
          <header className={styles.header}>
            <MyLink to={"/users/user/" + itineraryUserData.userPage}>
              <img
                className={styles.header__photo}
                title={itineraryUserData.username}
                alt={itineraryUserData.username}
                src={itineraryUserData.pfp || genericPfp}
              />
            </MyLink>
            <h3 className={styles.header__title}>{title}</h3>
            {isLoggedInUserItinerary && !deleting ? (
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
                style={{ height: "1.5em", marginRight: "5px" }}
                aria-label={"Clock icon"}
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
              <summary
                className={styles.viewMoreButton}
                onClick={() => setShowActivities(!showActivities)}
              >
                View more
              </summary>
              {showActivities ? <Activities activities={activities} /> : ""}
            </details>
          </section>
        </>
      )}
    </article>
  );
}

function Activities({ activities }) {
  const [allActivities, setAllActivities] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/activities/` + activities)
      .then((resp) => setAllActivities(resp.data.activities))
      .catch((err) => console.log(err));
  }, [activities]);

  return (
    <section className={styles.activities}>
      <h4 className={styles.activities__title}>Activities</h4>
      {allActivities.length > 0 ? (
        <ul>
          {allActivities.map((activity, i) => (
            <li key={i} className={styles.activities__activity}>
              {activity}
            </li>
          ))}
        </ul>
      ) : (
        <LoadingRing centered white />
      )}
    </section>
  );
}

export default Itinerary;
