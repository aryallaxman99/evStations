import { useState, useCallback } from "react";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import "./App.css";

const center = {
  lat: 27.7065175188602,
  lng: 85.31568158463786,
};

function App() {
  const [map, setMap] = useState(null);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  });

  const onLoad = useCallback((map) => {
    setMap(map);
  }, []);

  const onUnmount = useCallback((map) => {
    setMap(null);
  }, []);

  return isLoaded ? (
    <div className="px-10 pt-4">
      <h1 className="text-3xl text-red-300 mb-3">EV Charging Stations</h1>
      <GoogleMap
        mapContainerStyle={{ width: "900px", height: "700px" }}
        center={center}
        zoom={14}
        onLoad={onLoad}
        onUnmount={onUnmount}
      ></GoogleMap>
    </div>
  ) : (
    <>
      <h1 className="p-20 text-center text-red-600 text-3xl">
        Is Loaded is not called.
      </h1>
    </>
  );
}

export default App;
