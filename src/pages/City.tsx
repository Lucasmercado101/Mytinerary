import { useState } from "react";
import { useParams } from "react-router-dom";
import { getCity } from "../api";
import { useQuery } from "react-query";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  List,
  ListItem,
  TextField,
  Typography
} from "@mui/material";
import { Box, CircularProgress, Fab } from "@mui/material";
import Itinerary from "../components/Itinerary";
import AddIcon from "@mui/icons-material/Add";

interface urlParams {
  id: string;
}

function City() {
  const [isNewItineraryModalOpen, setIsNewItineraryModalOpen] = useState(false);

  const handleClickOpen = () => {
    setIsNewItineraryModalOpen(true);
  };

  const handleClose = () => {
    setIsNewItineraryModalOpen(false);
  };

  const { id } = useParams<urlParams>();
  const { data, isLoading, error } = useQuery(["city", id], () => getCity(+id));

  if (data) {
    const { country, id, name } = data.data;

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
        {/* <List>
          <ListItem>
            <Itinerary />
          </ListItem>
        </List> */}
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
              label="Itinerary Name"
              fullWidth
              variant="standard"
            />
            <Grid container spacing={{ sm: 0, md: 3 }}>
              <Grid item xs={12} md={6}>
                <TextField
                  margin="dense"
                  type="number"
                  inputProps={{ min: 1 }}
                  label="Duration (hours)"
                  variant="standard"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  margin="dense"
                  type="number"
                  inputProps={{ min: 1 }}
                  label="Price"
                  variant="standard"
                  fullWidth
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button variant="text" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="contained" onClick={handleClose}>
              Create
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }

  return null;
}

export default City;
