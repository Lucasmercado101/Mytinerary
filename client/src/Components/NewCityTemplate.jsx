import React, { useState } from "react";
import { useSelector } from "react-redux";
import { postCity } from "../api";
import styles from "../Styles/newCityTemplate.module.css";
import Button from "./Button";
import MyModal from "./MyModal";

function NewCityTemplate({ onPost }) {
  const isDeletingUser = useSelector((state) => state.user.isDeletingUser);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");

  const createNewCity = async (e) => {
    e.preventDefault();
    setCity("");
    setCountry("");

    const cityUrlParam = city.split(" ").join("").toLowerCase();
    const newCity = {
      city,
      country,
      url: `https://source.unsplash.com/1600x900/?${cityUrlParam}?aerial`,
    };

    setIsModalOpen(false);
    postCity(newCity)
      .then(() => onPost && onPost())
      .catch((err) => {
        alert(err);
      });
  };

  return (
    <>
      <Button
        text="New City"
        onClick={() => setIsModalOpen(true)}
        disabled={isDeletingUser}
        centered
        big
      />
      <MyModal
        onRequestClose={() => setIsModalOpen(false)}
        isOpen={isModalOpen}
      >
        <form onSubmit={(e) => createNewCity(e)}>
          <div className={styles.newCity}>
            <input
              className={styles.newCity__city}
              type="text"
              name="city"
              placeholder="City Name"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            />
            <small>
              <input
                className={styles.newCity__country}
                type="text"
                name="country"
                placeholder="Country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                required
              />
            </small>
          </div>
          <input
            className={styles.submit}
            disabled={isDeletingUser}
            type="submit"
            value="Create"
          />
        </form>
      </MyModal>
    </>
  );
}

export default NewCityTemplate;
