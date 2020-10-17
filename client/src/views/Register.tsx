import React, { useState } from "react";
import { TextField, Typography, Grid, Button } from "@material-ui/core";

function Register() {
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
  };

  return (
    <div style={{ padding: 25 }}>
      <Grid
        direction="column"
        alignItems="center"
        component="form"
        onSubmit={handleSubmit}
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
            value={formData.username}
            name="username"
            label="Username"
          />
        </Grid>
        <Grid item>
          <TextField
            onChange={handleInputChange}
            variant="filled"
            value={formData.password}
            name="password"
            label="Password"
          />
        </Grid>
        <Grid item>
          <TextField
            onChange={handleInputChange}
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
            name="firstname"
            label="First name"
          />
        </Grid>
        <Grid item>
          <TextField
            onChange={handleInputChange}
            variant="filled"
            value={formData.lastname}
            name="lastname"
            label="Last name"
          />
        </Grid>
        <Grid item>
          <TextField
            onChange={handleInputChange}
            variant="filled"
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
            disabled={formIsNotComplete}
          >
            Log In
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}

export default Register;
