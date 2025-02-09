import '../styles/location.css';
import { useEffect, useState } from 'react';

// components
import LocationList from './LocationList';

// models
import { getAutocompleteWeather } from '../models/weatherModel';

// types
import { Autocomplete } from '../types/Autocomplete';
import { LocationInputProp } from '../types/LocationInputProp';

export default function LocationInput(
  locationInputProps: LocationInputProp
): JSX.Element {
  const [typedLocation, setTypedLocation] = useState<string>('');
  const [autocomplete, setAutocomplete] = useState<Autocomplete[] | null>(null);
  const { setLongitude, setLatitude, location, setLocation, setError } =
    locationInputProps;

  // Once location is typed and is 4 or more chars
  useEffect(() => {
    if (typedLocation.length < 4) return;
    setError(false);
    getAutocompleteWeather(typedLocation)
      .then((data) => {
        setAutocomplete(data.data);
      })
      .catch((err) => {
        console.error(err);
        setError(true);
      });
  }, [typedLocation]);

  // on input change update input and run useEffect
  const searchLocations = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const entry: string = e.target.value;
    setError(false);
    setTypedLocation(entry);
    setLocation(entry);
    setAutocomplete(null);
  };

  // clears location list generted by API after 1 second of losing focus (enabling selecting location)
  const clearLocationList = (): void => {
    setTimeout(() => {
      setAutocomplete(null);
    }, 1000);
  };

  return (
    <>
      <input
        autoFocus
        id="location"
        placeholder="@location"
        onChange={searchLocations}
        value={location}
        onBlur={clearLocationList}
      ></input>
      <ul className="locations">
        {autocomplete ? (
          <LocationList
            autocomplete={autocomplete}
            setAutocomplete={setAutocomplete}
            setLongitude={setLongitude}
            setLatitude={setLatitude}
            setLocation={setLocation}
          />
        ) : null}
      </ul>
    </>
  );
}
