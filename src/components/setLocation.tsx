import { useState } from "react";
import Lottie from "lottie-react";
import animationlocationPin from "../../public/animation_lmjhs52m.json";


interface GeolocationPosition {
  coords: { longitude: number; latitude: number };
}

const Location = () => {
  const [coordinates, setCoordinates] = useState<string | null>(null);
  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      setCoordinates("Geolocation is not supported by this browser.");
    }
  };
  const showPosition = (position: GeolocationPosition) => {
    setCoordinates(
      `Latitude: ${position.coords.latitude}<br>Longitude: ${position.coords.longitude}`
    );
  };
  return (
    <>
      <div>
        <p> <Lottie  className="h-10, w-10" animationData={animationlocationPin} />Click the button to get your location</p>
        <button onClick={getLocation}>GET CURRENT LOCATION</button>
        <p
          dangerouslySetInnerHTML={{
            __html: coordinates || "",
          }}
        ></p>
      </div>
    </>
  );
};

export default Location;


