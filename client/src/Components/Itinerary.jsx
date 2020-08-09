import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  getUser,
  getPfp,
  getActivities,
  deleteItinerary as delItinerary,
} from "../api";
import { useFetch } from "./hooks/useFetch";
import styles from "../Styles/itinerary.module.css";

import clockIcon from "../Images/clock-icon.svg";
import genericPfp from "../Images/generic-user.svg";
import deleteIcon from "../Images/delete.svg";

import MyLink from "./MyLink";
import LoadingRing from "./LoadingRing";

function Itinerary({
  title,
  time,
  price,
  creator,
  hashtags,
  activities,
  id,
  onDelete,
}) {
  const isDeletingUser = useSelector((state) => state.user.isDeletingUser);
  const [data, , isFetchingData, fetchData] = useFetch(
    getUser,
    {},
    false,
    creator
  );
  const [pfpData, , , fetchPfp] = useFetch(getPfp, "", false);
  const userData = useSelector((state) => state.user.userData);
  const userPfp = useSelector((state) => state.user.userPfp);
  const [itineraryUserData, setItineraryUserData] = useState({});
  const [showActivities, setShowActivities] = useState(false);
  const [isDeletingItinerary, setIsDeletingItinerary] = useState(false);
  const isLoggedInUserItinerary = creator === userData._id;

  useEffect(() => {
    isLoggedInUserItinerary &&
      setItineraryUserData({
        username: userData.username,
        pfp: userPfp,
        userPage: userData._id,
      });
  }, [userData, userPfp, isLoggedInUserItinerary]);

  useEffect(() => {
    !isLoggedInUserItinerary && fetchData();
  }, [isLoggedInUserItinerary, fetchData]);

  //TODO: fetch pfpData on parent component, not here
  useEffect(() => {
    const thereIsData = Object.keys(data).length > 0;
    if (thereIsData) {
      setItineraryUserData({
        username: data.username,
        userPage: data._id,
      });
      data.pfp && fetchPfp(data.pfp);
    }
  }, [data, fetchPfp, setItineraryUserData]);

  useEffect(() => {
    pfpData &&
      setItineraryUserData((i) => {
        return { ...i, pfp: pfpData };
      });
  }, [pfpData, data]);

  useEffect(() => {
    let isMounted = true;
    if (isDeletingItinerary) {
      delItinerary(id)
        .then(() => {
          if (isMounted) {
            if (onDelete) onDelete();
          }
        })
        .catch((err) => alert(err))
        .finally(() => isMounted && setIsDeletingItinerary(false));
    }
    return () => (isMounted = false);
  }, [isDeletingItinerary, onDelete, id]);

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
            {isLoggedInUserItinerary &&
            !isDeletingUser &&
            !isDeletingItinerary ? (
              <img
                className={styles.header__configure}
                src={deleteIcon}
                onClick={() => setIsDeletingItinerary(true)}
                title={`Delete '${title}'`}
                alt={`Delete '${title}'`}
                disabled={isDeletingItinerary}
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
  const [data, , isFetchingData] = useFetch(
    getActivities,
    {},
    true,
    activities
  );

  return (
    <section className={styles.activities}>
      <h4 className={styles.activities__title}>Activities</h4>
      {!isFetchingData ? (
        <ul>
          {data.activities.map((activity, i) => (
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
