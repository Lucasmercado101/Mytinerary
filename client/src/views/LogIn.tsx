import React, { useState } from "react";
import { TextField, Typography, Grid, Button } from "@material-ui/core";

function LogIn() {
  const [formData, setFormData] = useState({ username: "", password: "" });

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
            Welcome Back
          </Typography>
        </Grid>
        <Grid item>
          <TextField
            value={formData.username}
            name="username"
            label="Username"
            onChange={handleInputChange}
            variant="filled"
          />
        </Grid>
        <Grid item>
          <TextField
            value={formData.password}
            name="password"
            label="Password"
            onChange={handleInputChange}
            variant="filled"
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

export default LogIn;
