import React, { useState, useEffect } from "react";
import {
  Typography,
  makeStyles,
  TextField,
  Grid,
  Button
} from "@material-ui/core";
import { useQuery } from "react-query";

import { getCities } from "../api";
import City from "../Components/City/City";
import NewCityModal from "../Components/NewCityModal/NewCityModal";

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
  },
  citiesList: {
    margin: 0,
    padding: 0,
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
  const { title, container, searchBar, citiesList } = useStyles();
  const [isModalOpen, setIsModalOpen] = useState(false);
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

      <Grid className={citiesList} component="ul" container spacing={2}>
        {/* TODO: placeholder error text, TODO: turn this into a css responsive card grid, woven material style */}
        {error ? <h3>Error: no cities found</h3> : ""}

        {isLoading &&
          !error &&
          [1, 2, 3, 4].map((_, index) => {
            return (
              <Grid key={index} container item component="li">
                <City loading={true} />
              </Grid>
            );
          })}

        {!error &&
          data?.map((city, index) => {
            if (
              searchFilter === "" ||
              city.name.toLowerCase().includes(searchFilter)
            )
              return (
                <Grid key={index} container item component="li">
                  <City
                    cityId={city._id}
                    country={city.country}
                    name={city.name}
                  />
                </Grid>
              );
          })}
      </Grid>

      <NewCityModal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
      />
      <Grid container justify="center">
        <Button
          size="large"
          color="primary"
          variant="contained"
          type="button"
          onClick={() => setIsModalOpen(true)}
        >
          New City
        </Button>
      </Grid>
    </div>
  );
};

export default Cities;
