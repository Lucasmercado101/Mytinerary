import React, { useState, useEffect, useReducer } from "react";
import styles from "../../Styles/logIn.module.css";
import { useDispatch, useSelector } from "react-redux";
import { logIn } from "../../Redux/Actions/userActions";
import { button, button__white } from "../../Styles/button.module.css";

const initialState = {
  logIn: false,
  logInData: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "CLICKED_LOG_IN":
      return { ...state, logInClicked: true, logInData: action.data };
    case "LOG_IN_ERROR":
      return { ...state, logInClicked: false, logInData: null };
    default:
      throw new Error();
  }
}

function LogIn(props) {
  const isLoggingIn = useSelector((state) => state.user.isLoggingIn);
  const isDeletingUser = useSelector((state) => state.user.isDeletingUser);
  const [formInfo, setFormInfo] = useState({
    username: "",
    password: "",
  });
  const dispatch = useDispatch();

  const [state, localDispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    let isMounted = true;

    if (state.logInClicked) {
      dispatch(logIn(state.logInData))
        .then(() => {
          isMounted && props.history.push("/");
          alert("Logged in.");
        })
        .catch((err) => {
          isMounted && localDispatch({ type: "LOG_IN_ERROR" });
          if (err.response) {
            if (err.response.status === 404) {
              return alert(`Login failed: ${err.response.statusText}`);
            }
          }
          alert(`Login failed: ${err}`);
        });
    }

    return () => (isMounted = false);
  }, [state, props.history, dispatch]);

  useEffect(() => {
    document.title = "Log in";
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    localDispatch({ type: "CLICKED_LOG_IN", data: formInfo });
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormInfo({ ...formInfo, [name]: value });
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <label htmlFor="username">Enter your username</label>
      <input
        type="text"
        name="username"
        onChange={handleInput}
        value={formInfo.username}
        className={styles.form__input}
        required
      />
      <label htmlFor="password">Enter your password</label>
      <input
        type="password"
        name="password"
        value={formInfo.password}
        onChange={handleInput}
        className={styles.form__input}
        required
      />
      <input
        type="submit"
        className={`${button} ${button__white}`}
        value={isLoggingIn ? "Logging in..." : "Log In"}
        disabled={isDeletingUser || isLoggingIn}
      />
    </form>
  );
}

export default LogIn;
