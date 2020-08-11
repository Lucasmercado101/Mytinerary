import React, { useState, useRef, useEffect, useReducer } from "react";
import styles from "../../Styles/createAccount.module.css";
import { button, button__white } from "../../Styles/button.module.css";
import { useDispatch, useSelector } from "react-redux";
import { logIn, createUser } from "../../Redux/Actions/user";
import addUser from "../../Images/add-user.svg";
import Button from "../Button";

const options = [
  "England",
  "France",
  "Germany",
  "Holland",
  "Ireland",
  "Spain",
  "United States",
];

const initialState = {
  createAccountClicked: false,
  createData: null,
  logInData: {},
};

function reducer(state, action) {
  switch (action.type) {
    case "CLICKED_CREATE_ACCOUNT":
      return { ...state, createAccountClicked: true, createData: action.data };
    case "SET_LOGIN_DATA":
      return { ...state, logInData: action.data };
    case "CREATE_ACCOUNT_ERROR":
      return {
        ...state,
        createAccountClicked: false,
        createData: null,
        logInData: {},
      };
    default:
      throw new Error();
  }
}

function CreateAccount(props) {
  const isCreatingAccount = useSelector(
    (state) => state.creatingAccount.isCreatingAccount
  );
  const isDeletingUser = useSelector((state) => state.user.isDeletingUser);
  const [formInfo, setFormInfo] = useState({
    username: "",
    password: "",
    email: "",
    firstName: "",
    lastName: "",
    country: "England",
  });
  const [uploadedUserImage, setUploadedUserImage] = useState();
  const [state, localDispatch] = useReducer(reducer, initialState);
  const dispatch = useDispatch();
  const imageUpload = useRef();

  useEffect(() => {
    document.title = "Create Account";
  }, []);

  useEffect(() => {
    let isMounted = true;

    if (state.createAccountClicked) {
      dispatch(createUser(...state.createData))
        .then(() => {
          dispatch(
            logIn({
              username: state.logInData.username,
              password: state.logInData.password,
            })
          );
          isMounted && props.history.push("/");
          alert("Created account successfuly.");
        })
        .catch((err) => {
          isMounted && localDispatch({ type: "CREATE_ACCOUNT_ERROR" });
          if (err.response) {
            if (err.response.status === 409) {
              return alert(
                `Account creation failed: ${err.response.statusText}`
              );
            }
          }
          alert(`Account creation failed: ${err}`);
        });
    }

    return () => (isMounted = false);
  }, [state, props.history, dispatch]);

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

    localDispatch({ type: "SET_LOGIN_DATA", data: formInfo });
    localDispatch({ type: "CLICKED_CREATE_ACCOUNT", data: [data, config] });
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
      {uploadedUserImage ? (
        <Button
          warning
          onClick={() => setUploadedUserImage(null)}
          text="Remove image"
        />
      ) : (
        <small style={{ textAlign: "center" }}>
          Image must be smaller than 10MB
        </small>
      )}
      <label htmlFor="username">Username</label>
      <input
        className={styles.form__input}
        type="text"
        name="username"
        id="username"
        onChange={handleFormInput}
        value={formInfo.username}
        required
      />
      <label htmlFor="password">Password</label>
      <input
        className={styles.form__input}
        type="text"
        name="password"
        id="password"
        onChange={handleFormInput}
        value={formInfo.password}
        required
      />
      <label htmlFor="email">Email</label>
      <input
        className={styles.form__input}
        type="email"
        name="email"
        id="email"
        onChange={handleFormInput}
        value={formInfo.email}
        required
      />
      <label htmlFor="firstName">First Name</label>
      <input
        className={styles.form__input}
        type="text"
        name="firstName"
        id="firstName"
        onChange={handleFormInput}
        value={formInfo.firstName}
        required
      />
      <label htmlFor="lastName">Last Name</label>
      <input
        className={styles.form__input}
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
        disabled={isDeletingUser || isCreatingAccount}
        value={isCreatingAccount ? "Creating account..." : "Create"}
      />
    </form>
  );
}

export default CreateAccount;
