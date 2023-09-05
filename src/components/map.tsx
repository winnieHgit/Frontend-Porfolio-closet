import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const Map = () => {
  const mapIcon = L.icon({
    iconSize: [30, 30],
    iconAnchor:   [22, 94],
    shadowAnchor: [4, 62],
    popupAnchor:  [-3, -76],
    iconUrl: "/user-circle-2.svg",
  });

  return (
    <div className="h-64">
      <MapContainer
        center={[52.3676, 4.9041]}
        zoom={13}
        scrollWheelZoom={false}
        className="h-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[52.3676, 4.9041]} icon={mapIcon}>
          <Popup>Your current location</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default Map;

//[52.3676, 4.9041] Ams
