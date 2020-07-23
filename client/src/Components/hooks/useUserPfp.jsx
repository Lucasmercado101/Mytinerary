import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import genericPfp from "../../Images/generic-user.svg";

function useUserPfp() {
  const userData = useSelector((state) => state.user.userData);
  const [userPfp, setUserPfp] = useState("");

  useEffect(() => {
    if (Object.keys(userData).length !== 0) {
      if (userData.pfp.hasOwnProperty("data")) {
        const type = userData.pfp.type.split(".")[1];
        const imageData = Buffer.from(userData.pfp.data).toString("base64");
        setUserPfp(`data:image/${type};base64,${imageData}`);
      } else {
        setUserPfp(genericPfp);
      }
    } else {
      setUserPfp("");
    }
  }, [userData]);
  return userPfp;
}

export default useUserPfp;
