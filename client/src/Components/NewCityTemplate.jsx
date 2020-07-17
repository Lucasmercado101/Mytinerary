import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { postCity } from "../Redux/Actions/postCity";
import { postItineraries } from "../Redux/Actions/postCreateCityItineraries";

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

const styledButton = {
  listStyle: "none",
  color: "white",
  position: "absolute",
  left: "50%",
  transform: "translateX(-50%)",
  width: "50%",
  backgroundColor: "rgb(49, 49, 49)",
  padding: "8px 0",
  fontWeight: 300,
  fontSize: "1.2rem",
  borderRadius: "25px",
};

function NewCityTemplate() {
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const dispatch = useDispatch();

  const createNewCity = (e) => {
    e.preventDefault();
    if (city && country) {
      const newCity = {
        city,
        country,
        url: `https://source.unsplash.com/1600x900/?${city}?aerial`,
      };
      dispatch(postCity(newCity));
      dispatch(postItineraries({ city }));
      setCity("");
      setCountry("");
    }
  };

  return (
    <details style={{ marginBottom: "50px" }}>
      <summary style={styled}>New City</summary>
      <form onSubmit={(e) => createNewCity(e)}>
        <div
          style={{
            backgroundColor: "black",
          }}
          className="city"
        >
          <div>
            <input
              style={{
                background: "black",
                color: "white",
                border: "thin solid white",
                fontSize: "1.7rem",
                marginTop: "10px",
                width: "85%",
                margin: "0 7.5%",
              }}
              type="text"
              name="city"
              placeholder="City Name"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            />
            <small>
              <input
                style={{
                  background: "black",
                  color: "white",
                  border: "thin solid white",
                  width: "45%",
                  margin: "0 27.5%",
                  marginTop: "10px",
                  fontSize: "0.8rem",
                }}
                type="text"
                name="country"
                placeholder="Country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                required
              />
            </small>
          </div>
        </div>
        <input style={styledButton} type="submit" value="Create" />
      </form>
    </details>
  );
}

export default NewCityTemplate;
