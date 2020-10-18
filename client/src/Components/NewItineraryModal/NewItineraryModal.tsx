import React, { useState } from "react";
import {
  makeStyles,
  Modal,
  TextField,
  Button,
  Grid,
  Typography,
  TextareaAutosize
} from "@material-ui/core";

import { postCity } from "../../api";
import { useMutation, queryCache } from "react-query";

const useStyles = makeStyles(() => ({
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
  const [formData, setFormData] = useState({
    title: "",
    shortDescription: "",
    content: "",
    tags: ""
  });
  const [mutate, { isLoading }] = useMutation(postCity);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => {
      return { ...prevData, [name]: value };
    });
  };

  const formIsNotComplete = Object.values(formData).some(
    (value) => value === ""
  );

  const clearFormData = () =>
    setFormData({
      title: "",
      shortDescription: "",
      content: "",
      tags: ""
    });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formIsNotComplete) return;
    // const allTags = ;
    const allTags = ["tag", "tag2"];
    try {
      await mutate({
        title: formData.title,
        shortDescription: formData.shortDescription,
        content: formData.content,
        tags: formData.tags ? formData.tags.split(" ").slice(0, 3) : [""]
      });
      queryCache.invalidateQueries("itineraries");
      onRequestClose();
    } catch (error) {
      //TODO: error handle here
      console.error(error);
    }
  };
  // 5f8b7d4646257507d43a307f
  // 70 max chars for short
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
        <form onSubmit={handleSubmit} className={content}>
          <Grid alignItems="center" direction="column" container spacing={2}>
            <Grid item>
              <Typography variant="h4" component="h2">
                New Itinerary
              </Typography>
            </Grid>
            <Grid item>
              <TextField
                name="title"
                onChange={handleInputChange}
                value={formData.title}
                variant="outlined"
                label="Title"
              />
            </Grid>
            <Grid item>
              <TextField
                name="shortDescription"
                onChange={handleInputChange}
                value={formData.shortDescription}
                variant="outlined"
                label="Brief description"
              />
            </Grid>
            <Grid item>
              <TextField
                multiline
                rows={5}
                name="content"
                onChange={handleInputChange}
                value={formData.content}
                variant="outlined"
                label="Content"
              />
            </Grid>
            <Grid item>
              <TextField
                name="tags"
                onChange={handleInputChange}
                value={formData.tags}
                variant="outlined"
                label="Tags"
                helperText="3 tags max"
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
                <Button
                  disabled={formIsNotComplete || isLoading}
                  type="submit"
                  variant="contained"
                  color="primary"
                >
                  Create
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </Modal>
    </>
  );
};

export default NewCityModal;
