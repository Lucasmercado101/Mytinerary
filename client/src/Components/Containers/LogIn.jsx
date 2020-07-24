import React, { useState, useEffect } from "react";
import styles from "../../Styles/logIn.module.css";
import { useDispatch, useSelector } from "react-redux";
import { logIn } from "../../Redux/Actions/logIn";

function LogIn(props) {
  const userData = useSelector((state) => state.user.userData);
  const [formInfo, setFormInfo] = useState({
    username: "",
    password: "",
  });

  useEffect(() => {
    if (Object.keys(userData).length !== 0) {
      props.history.push("/");
    }
  }, [userData]);

  useEffect(() => {
    document.title = "Log in";
  }, []);

  const dispatch = useDispatch();

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
      <input type="submit" className={styles.form__submit} value="Log In" />
    </form>
  );
}

export default LogIn;
