import React, { useState, useRef } from "react";
import styles from "../Styles/createAccount.module.css";
import addUser from "../Images/add-user.svg";

function CreateAccount() {
  const [formInfo, setFormInfo] = useState({
    username: "",
    password: "",
    email: "",
    firstName: "",
    lastName: "",
    country: "",
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
    console.log("a");
  }

  function imageHandler(e) {
    const image = e.target.files[0];
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
      <div onClick={() => imageUpload.current.click()}>
        <img
          src={
            uploadedUserImage ? URL.createObjectURL(uploadedUserImage) : addUser
          }
        />
      </div>
      <label for="username">Username</label>
      <input
        type="text"
        name="username"
        id="username"
        onChange={handleFormInput}
        value={formInfo.username}
        required
      />
      <label for="password">Password</label>
      <input
        type="text"
        name="password"
        id="password"
        onChange={handleFormInput}
        value={formInfo.password}
        required
      />
      <label for="email">Email</label>
      <input
        type="email"
        name="email"
        id="email"
        onChange={handleFormInput}
        value={formInfo.email}
        required
      />
      <label for="firstName">First Name</label>
      <input
        type="text"
        name="firstName"
        id="firstName"
        onChange={handleFormInput}
        value={formInfo.firstName}
        required
      />
      <label for="lastName">Last Name</label>
      <input
        type="text"
        name="lastName"
        id="lastName"
        onChange={handleFormInput}
        value={formInfo.lastName}
        required
      />
      <label for="country">Country</label>
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
