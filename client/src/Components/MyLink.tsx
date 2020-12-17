import React, { CSSProperties } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getLastPageVisited } from "../Redux/Actions/lastPage";

type Props = {
  to: string;
  onClick?: () => void;
  className?: string;
  style?: CSSProperties;
};

const MyLink: React.FC<Props> = ({
  to,
  className,
  onClick,
  style,
  children
}) => {
  const dispatch = useDispatch();
  const location = useLocation().pathname;
  const destination = to || "";

  function handleClick() {
    onClick && onClick();
    if (location !== destination) {
      dispatch(getLastPageVisited(location));
    }
  }

  return (
    <Link
      className={className}
      style={style}
      to={destination}
      onClick={handleClick}
    >
      {children}
    </Link>
  );
};

export default MyLink;
