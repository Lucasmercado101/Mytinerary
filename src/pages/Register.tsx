import { Box } from ".pnpm/@mui+system@5.0.6_0c6b44af47723f3fbfad0689dde655a8/node_modules/@mui/system";
import { Avatar, Button, Icon, TextField } from "@mui/material";
import { useState, useRef } from "react";
import { register, registerWithProfilePic } from "../api";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import { useHistory } from "react-router-dom";

function Register() {
  const history = useHistory();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState({
    username: "",
    password: ""
  });
  const [userImage, setUserImage] = useState<File | null>(null);

  const { username, password } = formData;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;
    setUserImage(event.target.files[0]);
    event.target.value = "";
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    if (!userImage) {
      register({ username, password }).then(() => history.push("/login"));
    } else {
      registerWithProfilePic({
        username,
        password,
        profilePic: userImage
      }).then(() => history.push("/login"));
    }
    e.preventDefault();
  };

  return (
    <Box
      component="form"
      onSubmit={onSubmit}
      display="flex"
      flexDirection="column"
      m={4}
      gap={3}
    >
      <Avatar
        style={{
          width: "75%",
          height: "75%",
          aspectRatio: "1 / 1",
          alignSelf: "center"
        }}
        onClick={() => fileInputRef.current?.click()}
        src={userImage ? URL.createObjectURL(userImage) : undefined}
        imgProps={{
          style: { position: "absolute", top: 0, left: 0 }
        }}
      >
        {userImage && (
          <Icon style={{ transform: "scale(5.9)" }}>
            <AddAPhotoIcon />
          </Icon>
        )}
      </Avatar>
      {userImage && (
        <Button variant="outlined" onClick={() => setUserImage(null)}>
          Remove image
        </Button>
      )}
      <TextField
        type="text"
        value={username}
        placeholder="Username"
        onChange={onChange}
        name="username"
      />
      <TextField
        type="password"
        value={password}
        placeholder="Password"
        onChange={onChange}
        name="password"
      />
      <input
        ref={fileInputRef}
        style={{ display: "none" }}
        type="file"
        accept="image/*"
        onChange={onFileChange}
      />
      {/* {userImage && <img src={URL.createObjectURL(userImage)} alt="preview" />} */}

      <Button variant="contained" type="submit">
        Register
      </Button>
    </Box>
  );
}

export default Register;
