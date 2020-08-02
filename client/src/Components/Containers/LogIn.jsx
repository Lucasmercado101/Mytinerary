import React, { useState, useEffect } from "react";
import styles from "../../Styles/logIn.module.css";
import { useDispatch, useSelector } from "react-redux";
import { logIn, clearLogInFailure } from "../../Redux/Actions/authActions";
import { button, button__white } from "../../Styles/button.module.css";

function LogIn(props) {
  const userData = useSelector((state) => state.user.userData);
  const isFetchingLogIn = useSelector((state) => state.user.isFetchingLogIn);
  const failedLogIn = useSelector((state) => state.user.failedLogIn);
  const [formInfo, setFormInfo] = useState({
    username: "",
    password: "",
  });
  const dispatch = useDispatch();

  useEffect(() => {
    if (Object.keys(userData).length !== 0) {
      props.history.push("/");
    }
  }, [userData, props]);

  useEffect(() => {
    document.title = "Log in";
  }, []);

  useEffect(() => {
    if (failedLogIn) {
      alert(failedLogIn);
      dispatch(clearLogInFailure());
    }
  }, [failedLogIn, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(logIn(formInfo));
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
        value="Log In"
        disabled={isFetchingLogIn}
      />
    </form>
  );
}

export default LogIn;
