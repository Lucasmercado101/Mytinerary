import React from "react";
import styles from "../Styles/searchBar.module.css";

function SearchBar({ label, setFilteredResults, data, filter }) {
  const filterData = (e) => {
    const searchInput = e.target.value.toLowerCase();
    let filteredResults = searchInput
      ? data.filter((object) =>
          object[filter].toLowerCase().includes(searchInput)
        )
      : data;

    const sortedFilteredResults = filteredResults.sort((object1, object2) => {
      const string1 = object1[filter].toLowerCase();
      const string2 = object2[filter].toLowerCase();

      if (string1 < string2) {
        return -1;
      } else if (string1 > string2) {
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
