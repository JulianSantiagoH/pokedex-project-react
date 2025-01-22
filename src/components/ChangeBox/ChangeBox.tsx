import { useEffect, useState } from "react";
import "./ChangeBox.css";


function ChangeBox({ idRegion }) {
  const [regionData, setRegionData] = useState([]);

  useEffect(() => {
    if (idRegion) {
      fetch(`https://pokeapi.co/api/v2/generation/${idRegion}/`)
        .then((res) => res.json())
        .then((data) => {
          setRegionData(data.main_region.name);
          console.log(data.main_region.name);
        });
    }
  }, [idRegion]);
  return (
    <div className="regionName">
        {regionData ? (
            
            <h1>{regionData}</h1>
        ):(
            <p>Loading.....</p>
        )}
        
    </div>
  );
}

export default ChangeBox;
