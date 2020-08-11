import React, { useState } from "react";
import { useSelector } from "react-redux";
import { postItinerary } from "../api";
import styles from "../Styles/itinerary.module.css";

import clockIcon from "../Images/clock-icon.svg";
import genericPfp from "../Images/generic-user.svg";

import Button from "./Button";
import MyModal from "./MyModal";

const styleButton = {
  width: "50%",
  backgroundColor: "transparent",
  border: "none",
  color: "white",
  fontSize: "2rem",
};

function Itinerary({ city, onPost }) {
  const isDeletingUser = useSelector((state) => state.user.isDeletingUser);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hours, setHours] = useState("");
  const [price, setPrice] = useState("");
  const [title, setTitle] = useState("");
  const [hashtags, setHashtags] = useState({
    hashtag1: "",
    hashtag2: "",
    hashtag3: "",
  });
  const [activities, setactivities] = useState([""]);
  const userData = useSelector((state) => state.user.userData);
  const userPfp = useSelector((state) => state.user.userPfp);

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
        if (hs > 24) {
          setHours(24);
        } else {
          setHours(hs);
        }
      }
    }
  }

  function handleHashtagsInput(e) {
    const { name, value } = e.target;
    setHashtags({ ...hashtags, [name]: value });
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

    let filteredHashtags = [];
    for (const val in hashtags) {
      if (hashtags[val]) filteredHashtags.push(hashtags[val]);
    }

    const itinerary = {
      title: title,
      creator: userData._id,
      time: hours,
      price: price,
      hashtags: filteredHashtags,
      city,
      activities: [...activities],
    };
    postItinerary(itinerary)
      .then(() => {
        if (onPost) onPost();
        setIsModalOpen(false);
      })
      .catch((err) => alert(err));

    setHours("");
    setPrice("");
    setTitle("");
    setHashtags({
      hashtag1: "",
      hashtag2: "",
      hashtag3: "",
    });
    setactivities([""]);
  }

  return (
    <>
      <Button
        text="New Itinerary"
        onClick={() => setIsModalOpen(true)}
        centered
        big
        disabled={isDeletingUser}
      />
      <MyModal
        onRequestClose={() => setIsModalOpen(false)}
        isOpen={isModalOpen}
      >
        <form onSubmit={submitItinerary}>
          <article className={styles.itinerary}>
            <header className={styles.header}>
              <img
                className={styles.header__photo}
                alt={userData.username}
                src={userPfp || genericPfp}
              />
              <h3 className={styles.header__title}>
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
              <p className={styles.description__item}>
                <object
                  style={{ height: "1.5em", marginRight: "5px" }}
                  data={clockIcon}
                  aria-label={"Clock icon"}
                  type="image/svg+xml"
                />
                <input
                  size="1"
                  onChange={handleHoursInput}
                  value={hours}
                  className={styles.activities__templateInput}
                  required
                ></input>
                HS
              </p>
              <p className={styles.description__item}>
                $
                <input
                  size="2"
                  onChange={handlePriceInput}
                  value={price}
                  className={styles.activities__templateInput}
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
                  value={hashtags.hashtag1}
                  className={styles.activities__templateInput}
                ></input>
              </p>
              <p>
                #
                <input
                  size="7"
                  type="text"
                  name="hashtag2"
                  onChange={handleHashtagsInput}
                  value={hashtags.hashtag2}
                  className={styles.activities__templateInput}
                ></input>
              </p>
              <p>
                #
                <input
                  size="7"
                  type="text"
                  name="hashtag3"
                  onChange={handleHashtagsInput}
                  value={hashtags.hashtag3}
                  className={styles.activities__templateInput}
                ></input>
              </p>
            </section>
            <section>
              <section className={styles.activities}>
                <h4 className={styles.activities__title}>Activities</h4>
                <ul style={{ listStyle: "none" }}>
                  {activities.map((value, i) => (
                    <li key={i}>
                      <input
                        size="30"
                        type="text"
                        value={value}
                        className={styles.activities__input}
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
                      disabled={isDeletingUser}
                    />
                  </li>
                </ul>
              </section>
            </section>
          </article>
        </form>
      </MyModal>
    </>
  );
}

export default Itinerary;
