import { Box } from ".pnpm/@mui+system@5.0.6_0c6b44af47723f3fbfad0689dde655a8/node_modules/@mui/system";
import { Alert, Button, TextField } from "@mui/material";
import { useState } from "react";
import { useMutation } from "react-query";
import { useHistory } from "react-router-dom";
import { login } from "../api";

function Login() {
  const history = useHistory();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const { mutateAsync, error, isError, isLoading } = useMutation(login);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutateAsync({ username: userName, password }).then(() => history.push("/"));
  };

  return (
    <Box
      onSubmit={handleSubmit}
      component="form"
      m={2}
      display="flex"
      flexDirection="column"
      gap={3}
    >
      <TextField
        label="Username"
        type="text"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
      />
      <TextField
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button disabled={isLoading} variant="contained" type="submit">
        Login
      </Button>
      {isError && (
        <Alert severity="error">
          {(error as any).response.status === 404
            ? "Invalid username or password"
            : "An Error has occurred on the server, please try again."}
        </Alert>
      )}
    </Box>
  );
}

export default Login;
