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
  const [url, setUrl] = useState("");
  const dispatch = useDispatch();

  function handleCityChange(e) {
    setCity(e.target.value);
  }
  function handleCountryChange(e) {
    setCountry(e.target.value);
  }
  function handleURLChange(e) {
    setUrl(e.target.value);
  }

  function createNewCity() {
    if (city && country && url) {
      const newCity = {
        city,
        country,
        url,
      };
      dispatch(postCity(newCity));
      dispatch(postItineraries({ city }));
      setCity("");
      setCountry("");
      setUrl("");
    }
  }

  return (
    <details style={{ marginBottom: "50px" }}>
      <summary style={styled}>New City</summary>
      <div
        style={{
          backgroundColor: "black",
        }}
        className="city"
      >
        <div>
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
              onChange={handleCityChange}
            />
          </div>
          <div>
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
                onChange={handleCountryChange}
              />
            </small>
          </div>
          <div>
            <small>
              <input
                style={{
                  background: "black",
                  color: "white",
                  border: "thin solid white",
                  width: "75%",
                  margin: "0 12.5%",
                  marginTop: "10px",
                  fontSize: "0.8rem",
                }}
                type="text"
                name="url"
                placeholder="URL"
                value={url}
                onChange={handleURLChange}
              />
            </small>
          </div>
        </div>
      </div>
      <button style={styledButton} onClick={createNewCity}>
        Create
      </button>
    </details>
  );
}

export default NewCityTemplate;
