import React, { useState, useRef } from "react";
import styles from "../../Styles/createAccount.module.css";
import addUser from "../../Images/add-user.svg";
import axios from "axios";

function CreateAccount() {
  const [formInfo, setFormInfo] = useState({
    username: "",
    password: "",
    email: "",
    firstName: "",
    lastName: "",
    country: "England",
  });
  const [uploadedUserImage, setUploadedUserImage] = useState();

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

    axios
      .post("http://localhost:5000/api/users/create", data, config)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function imageHandler(e) {
    const image = e.target.files[0];
    console.log(image);
    setUploadedUserImage(image);
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
      <input type="submit" value="Create" />
    </form>
  );
}

export default CreateAccount;
