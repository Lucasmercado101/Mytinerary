import React from "react";
import styles from "../Styles/searchBar.module.css";

function SearchBar({ label, setFilteredResults, data, filter }) {
  const filterData = (e) => {
    const searchInput = e.target.value.toLowerCase();
    let filteredResults = data.filter((object) =>
      object[filter].toLowerCase().includes(searchInput)
    );
    const sortedFilteredResults = filteredResults.sort(function (
      object1,
      object2
    ) {
      if (object1[filter] < object2[filter]) {
        return -1;
      }
      if (object1[filter] > object2[filter]) {
        return 1;
      }
      return 0;
    });
    setFilteredResults(sortedFilteredResults);
  };

  return (
    <div className={styles.searchBar}>
      <label htmlFor="filter">{label} </label>
      <input
        className={styles.searchBar__input}
        type="text"
        id="filter"
        onChange={filterData}
      />
    </div>
  );
}

export default SearchBar;
