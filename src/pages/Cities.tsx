import {
  CityResp,
  createCity,
  getCities,
  isLoggedIn as isLoggedInQuery
} from "../api";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import {
  CircularProgress,
  Fab,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  TextField,
  Typography
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { Modal } from ".pnpm/@mui+material@5.0.6_1232132bd4823eec07a6df6246241393/node_modules/@mui/material";
import { Paper } from ".pnpm/@mui+material@5.0.6_1232132bd4823eec07a6df6246241393/node_modules/@mui/material";
import { Box } from ".pnpm/@mui+system@5.0.6_b094b78811fc8d2f00a90f13d0251fb6/node_modules/@mui/system";
import { Button } from ".pnpm/@mui+material@5.0.6_1232132bd4823eec07a6df6246241393/node_modules/@mui/material";

function Cities() {
  const history = useHistory();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: citiesData, isFetched } = useQuery("cities", getCities);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useQuery("user", isLoggedInQuery, {
    staleTime: 0,
    onSuccess: () => {
      setIsLoggedIn(true);
    }
  });
  const { mutateAsync, isLoading } = useMutation(createCity);
  const [newCityName, setNewCityName] = useState("");
  const [newCountry, setNewCountry] = useState("");
  const client = useQueryClient();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(newCityName, newCountry);
    if (!newCityName || !newCountry) return;

    mutateAsync({
      name: newCityName,
      country: newCountry
    }).then(() => {
      setNewCityName("");
      client.invalidateQueries("cities");
    });
    setIsModalOpen(false);
  };

  return (
    <div>
      {isLoggedIn && (
        <>
          <Modal
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
            open={isModalOpen}
            onClose={() => setIsModalOpen(false)}
          >
            <Paper>
              <Box
                sx={{
                  m: 3
                }}
              >
                <form
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    flexDirection: "column",
                    gap: 15
                  }}
                  onSubmit={handleSubmit}
                >
                  <Typography variant="h5" textAlign="center">
                    Add a new city
                  </Typography>
                  <TextField
                    onChange={(e) => setNewCityName(e.target.value)}
                    label="City"
                    variant="outlined"
                  />
                  <TextField
                    onChange={(e) => setNewCountry(e.target.value)}
                    label="Country"
                    variant="outlined"
                  />
                  <Button variant="contained" type="submit">
                    Create
                  </Button>
                  <Button
                    onClick={() => setIsModalOpen(false)}
                    variant="outlined"
                    type="submit"
                  >
                    Cancel
                  </Button>
                </form>
              </Box>
            </Paper>
          </Modal>
          <Fab
            disabled={isLoading}
            onClick={() => {
              setIsModalOpen(true);
            }}
            style={{
              position: "fixed",
              bottom: "2rem",
              right: "2rem",
              zIndex: 10
            }}
            color="primary"
          >
            {isLoading ? <CircularProgress color="secondary" /> : <AddIcon />}
          </Fab>
        </>
      )}
      <Typography
        style={{ marginTop: 10 }}
        variant="h4"
        component="h1"
        textAlign="center"
      >
        Cities
      </Typography>

      {isFetched && citiesData && (
        <List>
          {citiesData.data.map((city: CityResp) => (
            <ListItem key={city.id}>
              <ListItemButton
                onClick={() => history.push(`/cities/${city.id}`)}
                style={{ position: "relative" }}
              >
                <img
                  style={{
                    filter: "brightness(0.5)",
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    objectPosition: "center",
                    top: 0,
                    left: 0,
                    zIndex: -1
                  }}
                  src={`https://source.unsplash.com/featured/?${city.name}`}
                  alt={city.name}
                />
                <ListItemText
                  style={{ textAlign: "center" }}
                  primary={city.name}
                  secondary={city.country}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      )}
    </div>
  );
}

export default Cities;
