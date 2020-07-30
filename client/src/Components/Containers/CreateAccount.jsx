import React, { useState, useRef, useEffect } from "react";
import styles from "../../Styles/createAccount.module.css";
import { button, button__white } from "../../Styles/button.module.css";
import { useDispatch } from "react-redux";
import addUser from "../../Images/add-user.svg";
import axios from "axios";
import { logIn } from "../../Redux/Actions/userActions";

function CreateAccount(props) {
  const [formInfo, setFormInfo] = useState({
    username: "",
    password: "",
    email: "",
    firstName: "",
    lastName: "",
    country: "England",
  });
  const [uploadedUserImage, setUploadedUserImage] = useState();
  const [creatingUser, isCreatingUser] = useState(false);
  const dispatch = useDispatch();
  const options = [
    "England",
    "France",
    "Germany",
    "Holland",
    "Ireland",
    "Spain",
    "United States",
  ];

  const imageUpload = useRef();

  useEffect(() => {
    document.title = "Create Account";
  }, []);

  function handleFormInput(e) {
    const { name, value } = e.target;
    setFormInfo({ ...formInfo, [name]: value });
  }

  function handleFormSubmit(e) {
    e.preventDefault();
    let data = new FormData();

    const config = {
      headers: { "content-type": "multipart/form-data" },
    };

    for (const [key, value] of Object.entries(formInfo)) {
      data.append(key, value);
    }
    if (uploadedUserImage)
      data.append("file", uploadedUserImage, uploadedUserImage.name);

    isCreatingUser(true);
    axios
      .post("http://localhost:5000/api/users/create", data, config)
      .then((resp) => {
        isCreatingUser(false);
        alert("Account created succesfuly!");
        props.history.push("/");
        dispatch(
          logIn({ username: formInfo.username, password: formInfo.password })
        );
      })
      .catch((error) => {
        alert(error.response.statusText);
      });
  }

  function imageHandler(e) {
    const image = e.target.files[0];
    const tenMB = 10000000;
    if (image.size < tenMB) {
      setUploadedUserImage(image);
    } else {
      alert("File is too big");
    }
  }

  return (
    <form onSubmit={handleFormSubmit} className={styles.form}>
      <input
        style={{ display: "none" }}
        type="file"
        name="profilePic"
        id="profilePic"
        ref={imageUpload}
        onChange={imageHandler}
        accept="image/*"
      />
      <div
        style={{
          backgroundImage: uploadedUserImage
            ? `url(${URL.createObjectURL(uploadedUserImage)})`
            : "",
        }}
        className={styles.form__userPicture}
        onClick={() => imageUpload.current.click()}
      >
        {uploadedUserImage ? "" : <img src={addUser} alt="profile pic" />}
      </div>
      <small style={{ textAlign: "center" }}>
        Image must be smaller than 10MB
      </small>
      <label htmlFor="username">Username</label>
      <input
        type="text"
        name="username"
        id="username"
        onChange={handleFormInput}
        value={formInfo.username}
        required
      />
      <label htmlFor="password">Password</label>
      <input
        type="text"
        name="password"
        id="password"
        onChange={handleFormInput}
        value={formInfo.password}
        required
      />
      <label htmlFor="email">Email</label>
      <input
        type="email"
        name="email"
        id="email"
        onChange={handleFormInput}
        value={formInfo.email}
        required
      />
      <label htmlFor="firstName">First Name</label>
      <input
        type="text"
        name="firstName"
        id="firstName"
        onChange={handleFormInput}
        value={formInfo.firstName}
        required
      />
      <label htmlFor="lastName">Last Name</label>
      <input
        type="text"
        name="lastName"
        id="lastName"
        onChange={handleFormInput}
        value={formInfo.lastName}
        required
      />
      <label htmlFor="country">Country</label>
      <select
        id="country"
        name="country"
        onChange={handleFormInput}
        value={formInfo.country}
        required
      >
        {options.map((country) => {
          return (
            <option key={country} value={country}>
              {country}
            </option>
          );
        })}
      </select>
      <input
        type="submit"
        className={`${button} ${button__white}`}
        disabled={creatingUser}
        value="Create"
      />
    </form>
  );
}

export default CreateAccount;
