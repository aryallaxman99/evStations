import { useState, useCallback } from "react";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import { stations } from "./assets/stations";
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

  return (
    <div className="px-10 pt-4 w-full h-screen">
      <h1 className="text-3xl text-red-300 mb-3">
        EV Charging Stations in Nepal
      </h1>
      {isLoaded ? (
        <>
          <GoogleMap
            mapContainerStyle={{ width: "100%", height: "60%" }}
            center={center}
            zoom={14}
            onLoad={onLoad}
            onUnmount={onUnmount}
          ></GoogleMap>
        </>
      ) : (
        <>
          <div>
            <Skeleton height={500} className="mb-3" direction="ltr" />
          </div>
        </>
      )}
    </div>
  );
}

export default App;
