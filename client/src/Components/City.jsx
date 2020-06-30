import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCity } from "../Redux/Actions/getCity";

function City(props) {
  const city = useSelector((state) => state.city);
  const dispatch = useDispatch();
  const currentCity = props.match.params.city;
  useEffect(() => {
    dispatch(getCity(currentCity));
  }, []);

  return (
    <div>
      <button onClick={() => console.log(city)}>test</button>
      <h1 style={{ color: "black" }}>City here</h1>
    </div>
  );
}

export default City;
