import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import {
  CityItinerariesResponse,
  getCity,
  getCityItineraries,
  postNewCityItinerary,
  postNewCityItineraryInput
} from "../api";
import { useQuery, useQueryClient } from "react-query";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  InputAdornment,
  List,
  ListItem,
  TextField,
  Typography,
  Box,
  CircularProgress,
  Fab
} from "@mui/material";
import Itinerary from "../components/Itinerary";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Close";
import { v4 as uuidv4 } from "uuid";
import { useMutation } from "react-query";
import { AxiosError, AxiosResponse } from "axios";
import { useHistory } from "react-router-dom";

interface urlParams {
  id: string;
}

function City() {
  const queryClient = useQueryClient();
  const history = useHistory();
  const { id } = useParams<urlParams>();
  const { mutateAsync } = useMutation((vars: postNewCityItineraryInput) =>
    postNewCityItinerary(vars)
  );
  const [isNewItineraryModalOpen, setIsNewItineraryModalOpen] = useState(false);
  const [newItineraryTags, setNewItineraryTags] = useState(["", "", ""]);
  const [newItineraryActivities, setNewItineraryActivities] = useState([
    { id: uuidv4(), value: "" }
  ]);
  const [newItineraryData, setNewItineraryData] = useState({
    title: "",
    duration: "",
    price: ""
  });

  const thereIsAtLeastOneTag = newItineraryTags
    .filter((el) => el !== "")
    .some((tag) => tag.trim().length > 0);

  const thereIsAtLeastOneActivity = newItineraryActivities
    .filter((el) => el.value !== "")
    .some((activity) => activity.value.trim().length > 0);

  const canCreate =
    newItineraryData.title.length > 0 &&
    newItineraryData.duration.length > 0 &&
    newItineraryData.price.length > 0 &&
    thereIsAtLeastOneTag &&
    thereIsAtLeastOneActivity;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewItineraryData({
      ...newItineraryData,
      [e.target.name]: e.target.value
    });
  };

  const handleClose = () => {
    setIsNewItineraryModalOpen(false);
  };

  const { data, isLoading, isError, error } = useQuery(
    ["city", id],
    () => getCity(id),
    {
      retry: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false
    }
  );
  const { data: itineraries } = useQuery<
    AxiosResponse<CityItinerariesResponse[]>
  >(["cityItineraries", id], () => getCityItineraries(id));

  const handleSubmit = async () => {
    mutateAsync({
      title: newItineraryData.title,
      time: +newItineraryData.duration,
      price: +newItineraryData.price,
      cityId: id,
      hashtags: newItineraryTags,
      activities: newItineraryActivities.map((activity) => activity.value)
    }).then(() => {
      queryClient.invalidateQueries(["cityItineraries", id]);
    });
  };

  if (data) {
    const { country, name } = data.data;

    return (
      <div>
        <div
          style={{
            width: "100%",
            height: 175,
            position: "relative"
          }}
        >
          <img
            src={`https://source.unsplash.com/featured/?${name}`}
            alt={name}
            style={{
              objectFit: "cover",
              objectPosition: "center",
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              zIndex: -1,
              opacity: 0.4
            }}
          />
          <Box
            sx={{
              top: "50%",
              position: "relative",
              transform: "translateY(-50%)"
            }}
            display="flex"
            flexDirection="column"
          >
            <Typography variant="h4" textAlign="center">
              {name}
            </Typography>
            <Box color="text.secondary">
              <Typography variant="h5" textAlign="center">
                {country}
              </Typography>
            </Box>
          </Box>
        </div>
        <Typography variant="h5" my={2} textAlign="center">
          Available Itineraries
        </Typography>

        {itineraries?.data?.length ? (
          <List>
            {itineraries.data.map((itinerary) => (
              <ListItem key={itinerary.id}>
                <Itinerary data={itinerary} />
              </ListItem>
            ))}
          </List>
        ) : (
          <Typography variant="h6" textAlign="center">
            No itineraries yet
            <br />
            <Button
              onClick={() => {
                // ctx?.userData
                //   ? setIsNewItineraryModalOpen(true)
                //   : history.push("/login");
              }}
              variant="outlined"
              sx={{ mt: 2 }}
            >
              Add one
            </Button>
          </Typography>
        )}
        <Fab
          disabled={isLoading}
          onClick={() => {
            setIsNewItineraryModalOpen(true);
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

        <Dialog open={isNewItineraryModalOpen} onClose={handleClose}>
          <DialogTitle>Create a new Itinerary</DialogTitle>
          <DialogContent>
            <TextField
              margin="dense"
              name="title"
              label="Itinerary Name"
              fullWidth
              variant="standard"
              value={newItineraryData.title}
              onChange={handleChange}
            />
            <Grid container spacing={{ sm: 0, md: 3 }}>
              <Grid item xs={12} md={6}>
                <TextField
                  margin="dense"
                  name="duration"
                  type="number"
                  inputProps={{ min: 1 }}
                  label="Duration (hours)"
                  variant="standard"
                  fullWidth
                  value={newItineraryData.duration}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  name="price"
                  margin="dense"
                  type="number"
                  inputProps={{ min: 1 }}
                  label="Price"
                  variant="standard"
                  fullWidth
                  value={newItineraryData.price}
                  onChange={handleChange}
                />
              </Grid>
            </Grid>

            <Typography variant="h6" mt={2} mb={1}>
              Tags
            </Typography>
            <Grid container spacing={{ sm: 0, md: 2 }}>
              <Grid item xs={12} md={4}>
                <TextField
                  margin="dense"
                  value={newItineraryTags[0]}
                  onChange={(e) => {
                    const newTags = [
                      e.target.value,
                      newItineraryTags[1],
                      newItineraryTags[2]
                    ];
                    setNewItineraryTags(newTags);
                  }}
                  label="Tag #1"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  value={newItineraryTags[1]}
                  onChange={(e) => {
                    const newTags = [
                      newItineraryTags[0],
                      e.target.value,
                      newItineraryTags[2]
                    ];
                    setNewItineraryTags(newTags);
                  }}
                  margin="dense"
                  label="Tag #2"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  value={newItineraryTags[2]}
                  onChange={(e) => {
                    const newTags = [
                      newItineraryTags[0],
                      newItineraryTags[1],
                      e.target.value
                    ];
                    setNewItineraryTags(newTags);
                  }}
                  margin="dense"
                  label="Tag #3"
                  fullWidth
                />
              </Grid>
            </Grid>

            <Typography variant="h6" mt={2} mb={1}>
              Activities
            </Typography>
            <List sx={{ p: 0 }}>
              {newItineraryActivities.map((el, i) => (
                <ListItem sx={{ p: 0 }} key={el.id}>
                  <TextField
                    value={el.value}
                    onChange={(e) =>
                      setNewItineraryActivities(
                        newItineraryActivities.map((itinerary, i) => {
                          if (el.id === itinerary.id) {
                            return {
                              ...itinerary,
                              value: e.target.value
                            };
                          }
                          return itinerary;
                        })
                      )
                    }
                    fullWidth
                    margin="dense"
                    InputProps={
                      i === 0
                        ? undefined
                        : {
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton
                                  onClick={() => {
                                    const newActivities =
                                      newItineraryActivities.filter(
                                        (activity) => activity.id !== el.id
                                      );
                                    setNewItineraryActivities(newActivities);
                                  }}
                                  edge="end"
                                >
                                  <DeleteIcon />
                                </IconButton>
                              </InputAdornment>
                            )
                          }
                    }
                  />
                </ListItem>
              ))}
            </List>
            <Button
              onClick={() => {
                setNewItineraryActivities([
                  ...newItineraryActivities,
                  { id: uuidv4(), value: "" }
                ]);
              }}
              variant="outlined"
              sx={{ mt: 2 }}
              fullWidth
            >
              <AddIcon />
            </Button>
          </DialogContent>
          <DialogActions>
            <Button variant="text" onClick={handleClose}>
              Cancel
            </Button>
            <Button
              disabled={!canCreate}
              onClick={handleSubmit}
              variant="contained"
            >
              Create
            </Button>
          </DialogActions>
        </Dialog>
        {/* For the FAB */}
        <Box pt={10} />
      </div>
    );
  }
  if (isLoading) {
    return (
      <Typography textAlign="center" variant="h4" mt={2}>
        Loading...
      </Typography>
    );
  }
  if (isError && (error as AxiosError).response?.status === 404) {
    return (
      <Typography textAlign="center" mt={2} variant="h2">
        404
        <br />
        City not found
      </Typography>
    );
  }

  return null;
}

export default City;
