import '../styles/location.css';
import { useEffect, useState } from 'react';

// components
import LocationInput from './LocationInput';

// images
import LocationPin from '../assets/images/icons/location.svg';

// models
import { getLatandLongWeather } from '../models/weatherAPI/weatherModel';

// types
import { GeoLocationData } from '../types/GeoLocationData';
import { WeatherDataProp } from '../types/WeatherDataProp';
import { Coords } from '../types/Coords';

export default function Location({
  setWeatherData,
  setLoading,
  coords,
  setCoords,
}: {
  setWeatherData: React.Dispatch<React.SetStateAction<WeatherDataProp | null>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  coords: Coords;
  setCoords: React.Dispatch<React.SetStateAction<Coords>>;
}): JSX.Element {
  const [error, setError] = useState<boolean>(false);
  const [location, setLocation] = useState<string>('');

  // Once longitude is updated get geolocation data
  useEffect(() => {
    const longitude: number = coords.lon;
    const latitude: number = coords.lat;
    if (longitude === 0 && latitude === 0) return setLocation('');
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
  }, [coords]);

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
    setCoords({ lon: currentLongitude, lat: currentLatitude });
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
        setCoords={setCoords}
        setLocation={setLocation}
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
