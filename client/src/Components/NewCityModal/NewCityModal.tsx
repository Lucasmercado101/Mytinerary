import React, { useState } from "react";
import {
  makeStyles,
  Modal,
  TextField,
  Button,
  Grid,
  Typography
} from "@material-ui/core";

const useStyles = makeStyles(({ palette }) => ({
  modal: {
    height: "100%",
    width: "100%",
    margin: 0,
    overflow: "auto",
    padding: 15
  },
  content: {
    width: "100%",
    background: "white",
    padding: 20,
    margin: 0,
    marginBottom: 20,
    borderRadius: 6
  }
}));

type Props = {
  isOpen: boolean;
  onRequestClose: () => void;
};

const NewCityModal: React.FC<Props> = ({ isOpen, onRequestClose }) => {
  const { content, modal } = useStyles();
  const [formData, setFormData] = useState({ city: "", country: "" });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => {
      return { ...prevData, [name]: value };
    });
  };

  const clearFormData = () => setFormData({ city: "", country: "" });

  return (
    <>
      <Modal
        className={modal}
        open={isOpen}
        onClose={() => {
          clearFormData();
          onRequestClose();
        }}
        aria-labelledby="new city modal"
      >
        <div className={content}>
          <Grid alignItems="center" direction="column" container spacing={2}>
            <Grid item>
              <Typography variant="h4" component="h2">
                Add a New City
              </Typography>
            </Grid>
            <Grid item>
              <TextField
                name="city"
                onChange={handleInputChange}
                value={formData.city}
                variant="outlined"
                label="city"
              />
            </Grid>
            <Grid item>
              <TextField
                name="country"
                onChange={handleInputChange}
                value={formData.country}
                variant="outlined"
                label="country"
              />
            </Grid>
            <Grid justify="center" container item direction="row" spacing={2}>
              <Grid item>
                <Button
                  onClick={() => {
                    clearFormData();
                    onRequestClose();
                  }}
                  variant="outlined"
                  color="secondary"
                >
                  Cancel
                </Button>
              </Grid>
              <Grid item>
                <Button variant="contained" color="primary">
                  Create
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </div>
      </Modal>
    </>
  );
};

export default NewCityModal;
