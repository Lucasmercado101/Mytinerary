import React, { useState, useEffect } from "react";
import { Typography, makeStyles, TextField, Grid } from "@material-ui/core";
import { useQuery } from "react-query";

import { getCities } from "../api";
import City from "../Components/City/City";
// TODO:
// import NewCityTemplate from "../Components/NewCityTemplate";

const useStyles = makeStyles(() => ({
  container: {
    padding: "15px"
  },
  title: {
    textAlign: "center"
  },
  searchBar: {
    marginTop: "10px",
    marginBottom: "25px",
    width: "100%"
  }
}));

type CityType = {
  _id: string;
  name: string;
  country: string;
  url: string;
};

const Cities: React.FC = () => {
  const { title, container, searchBar } = useStyles();
  const [searchFilter, setSearchFilter] = useState("");
  const { isLoading, error, data } = useQuery<CityType[]>("cities", getCities);

  useEffect(() => {
    document.title = "Cities";
  }, []);

  return (
    <div className={container}>
      <Typography className={title} variant="h4" component="h1">
        Cities
      </Typography>
      <TextField
        onChange={(e) => setSearchFilter(e.target.value.toLowerCase())}
        value={searchFilter}
        className={searchBar}
        label="Search"
        variant="outlined"
      />

      <Grid component="ul" container spacing={2}>
        {isLoading &&
          !error &&
          [1, 2, 3, 4].map((_, index) => {
            return (
              <Grid key={index} container item component="li">
                <City loading={true} />
              </Grid>
            );
          })}

        {data?.map((city, index) => {
          if (
            searchFilter === "" ||
            city.name.toLowerCase().includes(searchFilter)
          )
            return (
              <Grid key={index} container item component="li">
                <City
                  country={city.country}
                  name={city.name}
                  imageUrl={city.url}
                />
              </Grid>
            );
        })}
      </Grid>
    </div>
  );
};

export default Cities;
