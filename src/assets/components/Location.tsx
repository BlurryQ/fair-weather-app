import { useEffect, useState } from "react";
import "../../styles/location.css";
import axios from "axios";
import LocationInput from "./LocationInput";

import { WeatherDataProp } from "../../types/WeatherDataProp";

// types
import { GeoLocationData } from "../../types/GeoLocationData";

export default function Location({
  setWeatherData,
}: {
  setWeatherData: React.Dispatch<React.SetStateAction<WeatherDataProp | null>>;
}): JSX.Element {
  const [longitude, setLongitude] = useState<number>(0);
  const [latitude, setLatitude] = useState<number>(0);
  const [location, setLocation] = useState<string>("");

  // Once longitude is updated get geolocation data
  useEffect(() => {
    if (longitude === 0 && latitude === 0) return;
    const api_key: string = import.meta.env.VITE_API_KEY;
    const url: string = `https://api.weatherapi.com/v1/forecast.json?key=${api_key}&q=${latitude},${longitude}&days=3`;
    axios
      .get(url)
      .then((data) => {
        setWeatherData(data.data);
        const townAndRegion: string = `${data.data.location.name}, ${data.data.location.region}`;
        setLocation(townAndRegion);
      })
      .catch((err) => console.error(err));
  }, [longitude]);

  // ask user for permission, or if browser unable to alert user
  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  // update geolocation with coords
  const showPosition = (geolocation: GeoLocationData) => {
    const currentLongitude: number = geolocation.coords.longitude;
    const currentLatitude: number = geolocation.coords.latitude;
    setLongitude(currentLongitude);
    setLatitude(currentLatitude);
  };

  return (
    <div className="location">
      <label htmlFor="location"></label>
      <button className="location-button" onClick={getLocation}>
        <img alt="location icon" src="./icons/location.svg" />
      </button>
      <LocationInput
        setLongitude={setLongitude}
        setLatitude={setLatitude}
        location={location}
        setLocation={setLocation}
      />
    </div>
  );
}
