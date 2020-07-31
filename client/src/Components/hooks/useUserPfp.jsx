import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import genericPfp from "../../Images/generic-user.svg";
import addUser from "../../Images/add-user.svg";

function useUserPfp() {
  const userData = useSelector((state) => state.user.userData);
  const userPfp = useSelector((state) => state.user.userPfp);
  const [pfpData, setPfpData] = useState(null);

  useEffect(() => {
    if (Object.keys(userData).length > 0) {
      if (userPfp) {
        const type = userPfp.type.split(".")[1];
        const imageData = Buffer.from(userPfp.data).toString("base64");
        setPfpData(`data:image/${type};base64,${imageData}`);
      } else {
        setPfpData(genericPfp);
      }
    } else {
      setPfpData(addUser);
    }
  }, [userPfp, pfpData, userData]);
  return pfpData;
}

export default useUserPfp;