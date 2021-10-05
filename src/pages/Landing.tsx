import { Link } from "react-router-dom";

function Landing() {
  return (
    <div>
      Landing Page
      <Link to="/cities">Cities list</Link>
    </div>
  );
}

export default Landing;
