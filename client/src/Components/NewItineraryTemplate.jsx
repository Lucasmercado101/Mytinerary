import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { postItinerary } from "../Redux/Actions/postItinerary";
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

function Itinerary({ city }) {
  const [hours, setHours] = useState("");
  const [price, setPrice] = useState("");
  const [title, setTitle] = useState("");
  const [hashtag1, setHashtag1] = useState("");
  const [hashtag2, setHashtag2] = useState("");
  const [hashtag3, setHashtag3] = useState("");
  const [activities, setactivities] = useState([""]);
  const dispatch = useDispatch();

  function handlePriceInput(e) {
    const price = e.target.value;
    const isANumber = isNaN(price) === false;
    if (isANumber) {
      if (price.length < 5) {
        setPrice(price);
      }
    }
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

  function addActivity(e) {
    e.preventDefault();
    setactivities([...activities, ""]);
  }

  function removeActivity(e) {
    e.preventDefault();
    if (activities.length === 1) {
      return;
    }
    const newActivities = [...activities];
    newActivities.pop();
    setactivities([...newActivities]);
  }

  function handleActivitiesChange(i, e) {
    const { value } = e.target;
    const _ = [...activities];
    _[i] = value;
    setactivities(_);
  }

  function submitItinerary(e) {
    e.preventDefault();
    const itinerary = {
      title: title,
      rating: 0,
      time: hours,
      price: price,
      activities: "",
      hashtags: [hashtag1, hashtag2, hashtag3].filter((i) => i),
      city,
      activities: [...activities],
    };
    dispatch(postItinerary(itinerary));
    setHours("");
    setPrice("");
    setTitle("");
    setHashtag1("");
    setHashtag2("");
    setHashtag3("");
    setactivities([""]);
  }

  return (
    <details>
      <summary style={styled}>New Itinerary</summary>
      <form onSubmit={submitItinerary}>
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
                onChange={(e) => setTitle(e.target.value)}
                name={title}
                value={title}
                required
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
                onChange={handleHoursInput}
                value={hours}
                style={{ border: "thin solid black" }}
                required
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
                required
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
                {activities.map((value, i) => (
                  <li key={i}>
                    <input
                      style={activityStyle}
                      size="30"
                      type="text"
                      value={value}
                      onChange={(e) => handleActivitiesChange(i, e)}
                      required
                    ></input>
                  </li>
                ))}
                <li>
                  <button style={styleButton} onClick={(e) => addActivity(e)}>
                    +
                  </button>
                  <button
                    style={styleButton}
                    onClick={(e) => removeActivity(e)}
                  >
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
                  <input
                    style={{
                      color: "white",
                      background: "transparent",
                      fontSize: "1.5rem",
                      border: "none",
                    }}
                    type="submit"
                    value="Submit"
                  />
                </li>
              </ul>
            </section>
          </section>
        </article>
      </form>
    </details>
  );
}

export default Itinerary;
