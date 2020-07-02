import React, { useState } from "react";
import styles from "../Styles/itinerary.module.css";
import clockIcon from "../Images/clock-icon.svg";

const styled = {
  listStyle: "none",
  textAlign: "center",
  color: "white",
  width: "50%",
  backgroundColor: "rgb(49, 49, 49)",
  margin: "0 auto",
  padding: "8px 0",
  fontWeight: 300,
  fontSize: "1.2rem",
  borderRadius: "25px",
};

const styleButton = {
  width: "50%",
  backgroundColor: "transparent",
  border: "none",
  color: "white",
  fontSize: "2rem",
};

const activityStyle = { marginLeft: "8px", marginTop: "5px" };

function Itinerary() {
  const [hours, setHours] = useState("");
  const [price, setPrice] = useState("");
  const [title, setTitle] = useState("");
  const [hashtag1, setHashtag1] = useState("");
  const [hashtag2, setHashtag2] = useState("");
  const [hashtag3, setHashtag3] = useState("");
  const [activities, setactivities] = useState([
    <li key={0}>
      <input style={activityStyle} size="30" type="text"></input>
    </li>,
  ]);

  //stack overflow "How to implement a dynamic form with controlled components in reactjs"

  function handlePriceInput(e) {
    const price = e.target.value;
    if (price.length < 5) {
      setPrice(price);
    }
  }

  function handleTitleInput(e) {
    setTitle(e.target.value);
  }

  function handleHoursInput(e) {
    const hs = e.target.value;
    if (hs.length < 3) {
      const isANumber = isNaN(hs) === false;
      if (isANumber) {
        if (Number(hs > 24)) {
          setHours(24);
        } else {
          setHours(hs);
        }
      }
    }
  }

  function handleHashtagsInput(e) {
    if (e.target.name === "hashtag1") {
      setHashtag1(e.target.value);
    }
    if (e.target.name === "hashtag2") {
      setHashtag2(e.target.value);
    }
    if (e.target.name === "hashtag3") {
      setHashtag3(e.target.value);
    }
  }

  function addActivity() {
    setactivities([
      ...activities,
      <li key={activities.length}>
        <input style={activityStyle} size="30" type="text"></input>
      </li>,
    ]);
  }

  function removeActivity() {
    const newActivities = activities;
    newActivities.pop();
    setactivities([newActivities]);
  }

  function submitItinerary() {
    console.log(activities);
    const itinerary = {
      title: title,
      rating: 0,
      time: hours,
      price: price,
      activities: "",
      hashtags: [hashtag1, hashtag2, hashtag3].filter((i) => i),
    };

    console.log(itinerary);
  }

  return (
    <details>
      <summary style={styled}>New Itinerary</summary>
      <article className={styles.itinerary}>
        <header className={styles.titleSection}>
          <img
            className={styles.photo}
            src="https://source.unsplash.com/featured/600x600/?face,man"
          />
          <h3 className={styles.title}>
            <input
              size="18"
              type="text"
              onChange={handleTitleInput}
              value={title}
            ></input>
          </h3>
        </header>
        <section className={styles.description}>
          <p className={styles.descriptionItem}>
            <object
              style={{ height: "1.5em", marginRight: "5px" }}
              data={clockIcon}
              type="image/svg+xml"
            />
            <input
              size="1"
              type="text"
              onChange={handleHoursInput}
              value={hours}
              style={{ border: "thin solid black" }}
            ></input>
            HS
          </p>
          <p>
            $
            <input
              size="2"
              onChange={handlePriceInput}
              value={price}
              style={{ border: "thin solid black" }}
            ></input>
          </p>
        </section>
        <section className={styles.hashtags}>
          <p>
            #
            <input
              size="7"
              type="text"
              name="hashtag1"
              onChange={handleHashtagsInput}
              value={hashtag1}
              style={{ border: "thin solid black" }}
            ></input>
          </p>
          <p>
            #
            <input
              size="7"
              type="text"
              name="hashtag2"
              onChange={handleHashtagsInput}
              value={hashtag2}
              style={{ border: "thin solid black" }}
            ></input>
          </p>
          <p>
            #
            <input
              size="7"
              type="text"
              name="hashtag3"
              onChange={handleHashtagsInput}
              value={hashtag3}
              style={{ border: "thin solid black" }}
            ></input>
          </p>
        </section>
        <section>
          <section className={styles.activities}>
            <h4>Activities</h4>
            <ul style={{ listStyle: "none" }}>
              {activities}
              <li>
                <button style={styleButton} onClick={addActivity}>
                  +
                </button>
                <button style={styleButton} onClick={removeActivity}>
                  -
                </button>
              </li>
              <li
                style={{
                  display: "flex",
                  justifyContent: "center",
                  backgroundColor: "rgb(49, 49, 49)",
                }}
              >
                <button
                  style={{
                    color: "white",
                    background: "transparent",
                    fontSize: "1.5rem",
                    border: "none",
                  }}
                  onClick={submitItinerary}
                >
                  Submit
                </button>
              </li>
            </ul>
          </section>
        </section>
      </article>
    </details>
  );
}

export default Itinerary;
