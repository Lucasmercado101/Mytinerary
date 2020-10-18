import React, { useState } from "react";
import { TextField, Typography, Grid, Button } from "@material-ui/core";
import { useMutation } from "react-query";

import { postNewUser } from "../api";

function Register() {
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
    <div style={{ padding: 25 }}>
      <form onSubmit={handleSubmit}>
        <Grid
          direction="column"
          alignItems="center"
          component="form"
          spacing={2}
          container
        >
          <Grid item>
            <Typography variant="h4" align="center" component="h1">
              Create Your Account
            </Typography>
          </Grid>
          <Grid item>
            <TextField
              onChange={handleInputChange}
              variant="filled"
              type="text"
              value={formData.username}
              name="username"
              label="Username"
            />
          </Grid>
          <Grid item>
            <TextField
              onChange={handleInputChange}
              variant="filled"
              type="password"
              value={formData.password}
              name="password"
              label="Password"
            />
          </Grid>
          <Grid item>
            <TextField
              onChange={handleInputChange}
              type="email"
              variant="filled"
              value={formData.email}
              name="email"
              label="Email"
            />
          </Grid>
          <Grid item>
            <TextField
              onChange={handleInputChange}
              variant="filled"
              type="text"
              name="firstname"
              label="First name"
            />
          </Grid>
          <Grid item>
            <TextField
              onChange={handleInputChange}
              variant="filled"
              type="text"
              value={formData.lastname}
              name="lastname"
              label="Last name"
            />
          </Grid>
          <Grid item>
            <TextField
              onChange={handleInputChange}
              variant="filled"
              type="text"
              value={formData.country}
              name="country"
              label="Country"
            />
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
      </form>
    </div>
  );
}

export default Register;
