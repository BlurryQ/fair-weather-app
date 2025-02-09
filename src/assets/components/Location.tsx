import '../styles/location.css';
import { useEffect, useState } from 'react';

// components
import LocationInput from './LocationInput';

// images
import LocationPin from '/icons/location.svg';

// models
import { getLatandLongWeather } from '../models/weatherModel';

// types
import { GeoLocationData } from '../types/GeoLocationData';
import { WeatherDataProp } from '../types/WeatherDataProp';

export default function Location({
  setWeatherData,
  setLoading,
}: {
  setWeatherData: React.Dispatch<React.SetStateAction<WeatherDataProp | null>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}): JSX.Element {
  const [error, setError] = useState<boolean>(false);
  const [longitude, setLongitude] = useState<number>(0);
  const [latitude, setLatitude] = useState<number>(0);
  const [location, setLocation] = useState<string>('');

  // Once longitude is updated get geolocation data
  useEffect(() => {
    if (longitude === 0 && latitude === 0) return;
    setLoading(true);
    setError(false);
    getLatandLongWeather(latitude, longitude)
      .then(({ data }) => {
        setWeatherData(data);
        const townAndRegion: string = `${data.location.name}, ${data.location.region}`;
        setLocation(townAndRegion);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
        setError(true);
      });
  }, [longitude]);

  // ask user for permission, or if browser unable to alert user
  const getLocation = (): void => {
    setLoading(true);
    setError(false);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  };

  // update geolocation with coords
  const showPosition = (geolocation: GeoLocationData): void => {
    const currentLongitude: number = geolocation.coords.longitude;
    const currentLatitude: number = geolocation.coords.latitude;
    setLongitude(currentLongitude);
    setLatitude(currentLatitude);
    setLoading(false);
  };

  return (
    <div className="location">
      <label htmlFor="location"></label>
      <button className="location-button" onClick={getLocation}>
        <img src={LocationPin} alt="location pin" />
      </button>
      <LocationInput
        location={location}
        setLatitude={setLatitude}
        setLocation={setLocation}
        setLongitude={setLongitude}
        setError={setError}
      />
      {error ? (
        <ul>
          <li className="error">Error Loading Data</li>
          <li className="error">Please try again</li>
        </ul>
      ) : null}
    </div>
  );
}
