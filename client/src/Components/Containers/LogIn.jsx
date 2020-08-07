import React, { useState, useEffect } from "react";
import styles from "../../Styles/logIn.module.css";
import { useDispatch, useSelector } from "react-redux";
import { logIn } from "../../Redux/Actions/userActions";
import { button, button__white } from "../../Styles/button.module.css";

function LogIn(props) {
  const loggingInError = useSelector((state) => state.user.loggingInError);
  const isLoggingIn = useSelector((state) => state.user.isLoggingIn);
  const [clickedLogIn, setClickedLogIn] = useState(false);
  const [logInData, setLogInData] = useState();
  const [formInfo, setFormInfo] = useState({
    username: "",
    password: "",
  });
  const dispatch = useDispatch();

  useEffect(() => {
    let isMounted = true;

    if (clickedLogIn && logInData) {
      dispatch(logIn(logInData)).then(() => {
        if (isMounted) {
          props.history.push("/");
        }
      });
    }

    return () => (isMounted = false);
  }, [clickedLogIn, logInData, props.history, dispatch]);

  useEffect(() => {
    if (loggingInError) {
      alert(loggingInError);
      setClickedLogIn(false);
      setLogInData(null);
    }
  }, [loggingInError]);

  useEffect(() => {
    document.title = "Log in";
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setClickedLogIn(true);
    setLogInData(formInfo);
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
        disabled={isLoggingIn}
      />
    </form>
  );
}

export default LogIn;
