import React from "react";
import styles from "../Styles/itinerary.module.css";
import clockIcon from "../Images/clock-icon.svg";
import likeIcon from "../Images/like-icon.svg";

function Itinerary() {
  return (
    <article className={styles.itinerary}>
      <header className={styles.titleSection}>
        <img
          className={styles.photo}
          src="https://source.unsplash.com/featured/600x600/?face,man"
        />
        <h3 className={styles.title}>Lorem ipsum dolor sit.</h3>
      </header>
      <section className={styles.description}>
        <p className={styles.descriptionItem}>
          <object
            style={{ height: "1.2em", marginRight: "5px" }}
            data={likeIcon}
            type="image/svg+xml"
          />
          100
        </p>
        <p className={styles.descriptionItem}>
          <object
            style={{ height: "1.5em", marginRight: "5px" }}
            data={clockIcon}
            type="image/svg+xml"
          />
          12HS
        </p>
        <p>$$</p>
      </section>
      <section className={styles.hashtags}>
        <p>#Art</p>
        <p>#Architecture</p>
        <p>#History</p>
      </section>
      <section>
        <details>
          <summary className={styles.viewMoreButton}>View more</summary>
          <section className={styles.activities}>
            <h4>Activities</h4>
            <ul>
              <li className={styles.activity}>Lorem, ipsum dolor.</li>
              <li className={styles.activity}>Lorem.</li>
              <li className={styles.activity}>Lorem ipsum dolor sit amet.</li>
            </ul>
          </section>
        </details>
      </section>
    </article>
  );
}

export default Itinerary;
