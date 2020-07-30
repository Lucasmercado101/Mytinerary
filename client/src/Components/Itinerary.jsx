import React, { useState, useEffect } from "react";
import axios from "axios";
import MyLink from "./MyLink";
import styles from "../Styles/itinerary.module.css";
import clockIcon from "../Images/clock-icon.svg";
import likeIcon from "../Images/like-icon.svg";
import genericPfp from "../Images/generic-user.svg";

function Itinerary({
  title,
  time,
  rating,
  price,
  creator,
  hashtags,
  activities,
}) {
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

  useEffect(() => {
    (async function () {
      await axios
        .get("http://localhost:5000/api/itineraries/userPfp/" + creator)
        .then((resp) => {
          const { user, pfp } = resp.data;
          setUserName(user.username);
          setUserPage(user._id);
          if (pfp) {
            const type = pfp.type.split(".")[1];
            const imageData = Buffer.from(pfp.data).toString("base64");
            setUserImage(`data:image/${type};base64,${imageData}`);
          }
        });
    })();
  }, []);

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
