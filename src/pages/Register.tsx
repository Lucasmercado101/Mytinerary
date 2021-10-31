import { useState } from "react";
import { register, registerWithProfilePic } from "../api";

function Register() {
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
      register({ username, password });
    } else {
      registerWithProfilePic({ username, password, profilePic: userImage });
    }
    e.preventDefault();
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          value={username}
          placeholder="Username"
          onChange={onChange}
          name="username"
        />
        <input
          type="password"
          value={password}
          placeholder="Password"
          onChange={onChange}
          name="password"
        />
        <input type="file" accept="image/*" onChange={onFileChange} />
        {userImage && (
          <img src={URL.createObjectURL(userImage)} alt="preview" />
        )}

        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;
