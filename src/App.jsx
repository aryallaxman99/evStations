import "./App.css";
import { stations } from "./assets/stations";

import { useState, useCallback, useEffect } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { toast, Toaster } from "sonner";

function App() {
  const [map, setMap] = useState(null);
  const [center, setCenter] = useState({
    lat: 27.7103,
    lng: 85.3222,
  });
  const [chargingStations, setChargingStations] = useState([]);

  useEffect(() => {
    const newStations = stations.map((item) => ({
      lat: Number(item.latitude),
      lng: Number(item.longitude),
    }));

    setChargingStations(newStations);
  }, [stations]);

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

  const getCurrentLocation = () => {
    const success = (position) => {
      setCenter({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    };

    const error = (err) => toast.error(err.message);

    navigator.geolocation.getCurrentPosition(success, error, {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    });
  };

  return (
    <div className="px-10 pt-4 w-full h-screen">
      <Toaster position="bottom-right" />
      <h1 className="text-3xl text-red-300 mb-3">
        EV Charging Stations in Nepal
      </h1>
      {isLoaded ? (
        <>
          <GoogleMap
            mapContainerStyle={{ width: "100%", height: "60%" }}
            center={center}
            zoom={7}
            onLoad={onLoad}
            onUnmount={onUnmount}
          >
            {chargingStations
              ? chargingStations.map((locations, index) => (
                  <Marker
                    icon={{
                      url: "https://cdn-icons-png.flaticon.com/512/4979/4979090.png",
                      scaledSize: new window.google.maps.Size(40, 40),
                    }}
                    key={index}
                    position={locations}
                  />
                ))
              : null}

            <button
              type="button"
              className="absolute bottom-48 right-3 bg-white w-auto"
              onClick={() => getCurrentLocation()}
            >
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 24 24"
                className="h-10 w-10 text-[#666666] hover:text-black"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="12" cy="12" r="4" />
                <path d="M13 4.069V2h-2v2.069A8.01 8.01 0 0 0 4.069 11H2v2h2.069A8.008 8.008 0 0 0 11 19.931V22h2v-2.069A8.007 8.007 0 0 0 19.931 13H22v-2h-2.069A8.008 8.008 0 0 0 13 4.069zM12 18c-3.309 0-6-2.691-6-6s2.691-6 6-6 6 2.691 6 6-2.691 6-6 6z" />
              </svg>
            </button>
          </GoogleMap>
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
