import React, { useState } from "react";
import {
  TextField,
  Typography,
  Grid,
  Button,
  makeStyles,
  useTheme,
  useMediaQuery
} from "@material-ui/core";
import { useMutation } from "react-query";

import registerImage from "../Images/register.svg";
import { postNewUser } from "../api";

const useStyles = makeStyles(({ breakpoints }) => ({
  createAccountPage: {
    padding: 15,
    height: "100%",
    width: "100%",
    [breakpoints.up("sm")]: {
      padding: 25
    }
  },
  field: {
    width: "100%"
  },
  spacing: {
    marginBottom: 16,
    [breakpoints.up("sm")]: {
      marginBottom: 0
    }
  }
}));

function Register() {
  const theme = useTheme();
  const mdAndBigger = useMediaQuery(theme.breakpoints.up("md"));
  const { createAccountPage, field, spacing } = useStyles();
  const [mutate, { isLoading: isCreatingUser }] = useMutation(postNewUser);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    firstname: "",
    lastname: "",
    email: "",
    country: "Spain"
  });

  const formIsNotComplete = Object.values(formData).some(
    (value) => value === ""
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => {
      return { ...prevData, [name]: value };
    });
  };

  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formIsNotComplete) return;
    //TODO: username must not be longer than 18 chars
    const {
      username,
      email,
      firstname,
      lastname,
      password,
      country
    } = formData;
    console.log("here");

    mutate({ username, email, firstname, lastname, password, country });
  };

  return (
    <Grid
      container
      alignItems="center"
      direction="row"
      className={createAccountPage}
      spacing={8}
      justify="space-evenly"
      style={{ margin: 0 }}
    >
      {mdAndBigger && (
        <Grid container md={6} lg={6} item>
          <Grid item>
            <img
              style={{ height: "100%", width: "100%" }}
              src={registerImage}
              alt="teamwork image"
            />
          </Grid>
        </Grid>
      )}
      <Grid
        onSubmit={handleSubmit}
        alignItems="center"
        component="form"
        direction="column"
        xs={12}
        md={6}
        lg={4}
        spacing={2}
        container
        item
      >
        <Grid xs={12} item>
          <Typography variant="h4" align="center" component="h1">
            Create Your Account
          </Typography>
        </Grid>
        <Grid container xs={12} justify="center" item>
          <Grid xs={11} item>
            <TextField
              className={field}
              onChange={handleInputChange}
              variant="filled"
              type="text"
              value={formData.username}
              name="username"
              label="Username"
            />
          </Grid>
        </Grid>
        <Grid container xs={12} justify="center" item>
          <Grid xs={11} item>
            <TextField
              className={field}
              onChange={handleInputChange}
              variant="filled"
              type="password"
              value={formData.password}
              name="password"
              label="Password"
            />
          </Grid>
        </Grid>
        <Grid container xs={12} justify="center" item>
          <Grid xs={11} item>
            <TextField
              className={field}
              onChange={handleInputChange}
              type="email"
              variant="filled"
              value={formData.email}
              name="email"
              label="Email"
            />
          </Grid>
        </Grid>
        <Grid container xs={12} item direction="row">
          <Grid
            container
            className={spacing}
            xs={12}
            sm={6}
            justify="center"
            item
          >
            <Grid xs={11} sm={10} item>
              <TextField
                className={field}
                onChange={handleInputChange}
                variant="filled"
                type="text"
                name="firstname"
                label="First name"
              />
            </Grid>
          </Grid>
          <Grid container xs={12} sm={6} justify="center" item>
            <Grid xs={11} sm={10} item>
              <TextField
                className={field}
                onChange={handleInputChange}
                variant="filled"
                type="text"
                value={formData.lastname}
                name="lastname"
                label="Last name"
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid container xs={12} justify="center" item>
          <Grid xs={11} item>
            <TextField
              className={field}
              onChange={handleInputChange}
              variant="filled"
              type="text"
              value={formData.country}
              name="country"
              label="Country"
            />
          </Grid>
        </Grid>
        <Grid item>
          <Button
            type="submit"
            color="primary"
            variant="contained"
            disabled={formIsNotComplete || isCreatingUser}
          >
            Register
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Register;
