import { useState } from "react";
import ChangeBox from "../../ChangeBox";

function ButtonBoxRight() {
  const [regionId, setRegionId] = useState(1);
  
  const buttonRightChange = () => {
    setRegionId(regionId + 1);
    console.log(regionId);
  };

  return (
    <>
      <button onClick={buttonRightChange}>Right</button>
      <ChangeBox idRegion={regionId} />
    </>
    
  );
}

export default ButtonBoxRight;
