import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

const Map = () => {
  const [location, setLocation] = useState([51.505, -0.09]); // Default to some location
  const [isLocationFound, setIsLocationFound] = useState(false);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        function (position) {
          setLocation([position.coords.latitude, position.coords.longitude]);
          setIsLocationFound(true);
        },
        function (error) {
          console.error("Error obtaining geolocation: ", error);
        }
      );
    } else {
      console.log("Geolocation is not available in this browser");
    }
  }, []);

  return (
    <div className="w-full h-[400px]">
      {isLocationFound ? (
        <MapContainer
          className="h-80 w-full"
          center={location}
          zoom={13}
          scrollWheelZoom={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={location}>
            <Popup>You are here!</Popup>
          </Marker>
        </MapContainer>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Map;