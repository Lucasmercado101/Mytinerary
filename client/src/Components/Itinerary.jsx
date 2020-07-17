import React, { useState } from "react";
import axios from "axios";
import styles from "../Styles/itinerary.module.css";
import clockIcon from "../Images/clock-icon.svg";
import likeIcon from "../Images/like-icon.svg";

function Itinerary({ title, time, rating, price, hashtags, activities }) {
  const [allActivities, setAllActivities] = useState([]);

  const fetchActivities = async () => {
    await axios
      .get(`http://localhost:5000/api/activities/` + activities)
      .then((resp) => setAllActivities(resp.data.activities))
      .catch((err) => console.log(err));
  };

  return (
    <article className={styles.itinerary}>
      <header className={styles.titleSection}>
        <img
          className={styles.photo}
          src="https://source.unsplash.com/featured/600x600/?face,man"
        />
        <h3 className={styles.title}>{title}</h3>
      </header>
      <section className={styles.description}>
        <p className={styles.descriptionItem}>
          <object
            style={{ height: "1.2em", marginRight: "5px" }}
            data={likeIcon}
            type="image/svg+xml"
          />
          {rating}
        </p>
        <p className={styles.descriptionItem}>
          <object
            style={{ height: "1.5em", marginRight: "5px" }}
            data={clockIcon}
            type="image/svg+xml"
          />
          {time}HS
        </p>
        <p>{price}</p>
      </section>
      <section className={styles.hashtags}>
        {hashtags.map((hashtag, i) => (
          <p key={i}>#{hashtag}</p>
        ))}
      </section>
      <section>
        <details>
          <summary className={styles.viewMoreButton} onClick={fetchActivities}>
            View more
          </summary>
          <section className={styles.activities}>
            <h4>Activities</h4>
            <ul>
              {allActivities.map((activity, i) => (
                <li key={i} className={styles.activity}>
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
