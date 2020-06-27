import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../Styles/cities.css";
import city1 from "../Images/berlin-germany.jpg";
import city2 from "../Images/buenosAires-argentina.jpg";
import city3 from "../Images/madrid-spain.jpg";
import city4 from "../Images/moscow-russia.jpg";
import city5 from "../Images/toronto-canada.jpg";

function Cities() {
  const allCities = [
    { name: "Berlin", img: city1 },
    { name: "Buenos Aires", img: city2 },
    { name: "Spain", img: city3 },
    { name: "Moscow", img: city4 },
    { name: "Toronto", img: city5 },
  ];

  const [filteredCities, setFilteredCities] = useState(allCities);

  const filterCities = (e) => {
    let filterText = e.target.value.toLowerCase();
    setFilteredCities(
      allCities.filter((city) => city.name.toLowerCase().includes(filterText))
    );
  };

  return (
    <div>
      <div className="search">
        <h1>CITIES</h1>
        <div className="searchbar">
          <label htmlFor="filter">Filter by city: </label>
          <input type="text" id="filter" onChange={filterCities} />
        </div>
      </div>
      {filteredCities.map(({ img, name }) => (
        <div
          key={name}
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
             url(${img})`,
            backgroundSize: "cover",
            zIndex: 1,
          }}
          className="city"
        >
          <Link to={`/cities/${name}`}>{name}</Link>
        </div>
      ))}
    </div>
  );
}

export default Cities;
