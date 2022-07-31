// 2 ----- google map api
import { GoogleMap, LoadScript } from "@react-google-maps/api";

const containerStyle = {
  width: "400px",
  height: "400px",
};

const center = {
  lat: 35.69575,
  lng: 139.77521,
};

const MyComponent = () => {
  return (
    <LoadScript googleMapsApiKey="AIzaSyAwKteS7KcJJHPbq1Blljdg1sE-Ddqt9-o">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={17}
      ></GoogleMap>
    </LoadScript>
  );
};

export default MyComponent;
// 2 ----- google map api

