import React, { useState, useEffect } from "react";
import {
  Typography,
  TextField,
  Grid,
  Button,
  Container
} from "@material-ui/core";
import { useQuery } from "react-query";

import { getCities } from "../../api";
import City from "../../Components/City/City";
import NewCityModal from "../../Components/NewCityModal/NewCityModal";
import { useStyles } from "./Styles";

type CityType = {
  _id: string;
  name: string;
  country: string;
  url: string;
};

const Cities: React.FC = () => {
  const {
    title,
    container,
    searchBar,
    citiesList,
    newCityButton
  } = useStyles();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchFilter, setSearchFilter] = useState("");
  const { isLoading, error, data } = useQuery<CityType[]>("cities", getCities);

  useEffect(() => {
    document.title = "Cities";
  }, []);

  return (
    <div className={container}>
      <Container maxWidth="sm">
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
      </Container>
      <Grid className={citiesList} component="ul" container spacing={2}>
        {/* TODO: placeholder error text, TODO: turn this into a css responsive card grid, woven material style */}
        {error ? <h3>Error: no cities found</h3> : ""}

        {isLoading &&
          !error &&
          [1, 2, 3, 4, 5, 6, 7, 8, 9].map((_, index) => {
            return (
              <Grid
                key={index}
                item
                component="li"
                xs={12}
                sm={6}
                md={4}
                lg={4}
                xl={4}
              >
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
                <Grid
                  key={index}
                  item
                  component="li"
                  xs={12}
                  sm={6}
                  md={4}
                  lg={3}
                  xl={2}
                >
                  <City
                    cityId={city._id}
                    country={city.country}
                    name={city.name}
                  />
                </Grid>
              );
          })}
      </Grid>

      <Grid className={newCityButton} container justify="center">
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
      <NewCityModal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default Cities;
