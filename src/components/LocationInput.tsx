import '../styles/location.css';
import { useEffect, useState } from 'react';

// components
import LocationList from './LocationList';

// models
import { getAutocompleteWeather } from '../models/weatherAPI/weatherModel';

// types
import { Autocomplete } from '../types/Autocomplete';
import { LocationInputProp } from '../types/LocationInputProp';

export default function LocationInput(
  locationInputProps: LocationInputProp
): JSX.Element {
  const [typedLocation, setTypedLocation] = useState<string>('');
  const [autocomplete, setAutocomplete] = useState<Autocomplete[]>([]);
  let [highlightedIndex, setHighlightedIndex] = useState<number>(0);
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

  // clears location list generted by API after 1 second of losing focus (enabling selecting location)
  const clearLocationList = (): void => {
    setTimeout(() => {
      setAutocomplete([]);
    }, 1000);
  };

  // on input change update input and run useEffect
  const searchLocations = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const entry: string = e.target.value;
    setError(false);
    setTypedLocation(entry);
    setLocation(entry);
    setAutocomplete([]);
  };

  // handles key presses
  const handleKeyDown = (e: React.KeyboardEvent): void => {
    const keyPressed: string = e.key;
    if (
      keyPressed === 'ArrowDown' &&
      highlightedIndex < autocomplete.length - 1
    )
      return setHighlightedIndex(highlightedIndex + 1);
    else if (keyPressed === 'ArrowUp' && highlightedIndex > 0)
      return setHighlightedIndex(highlightedIndex - 1);
    else if (keyPressed === 'Enter' && autocomplete.length === 0)
      return setError(true);
    else if (keyPressed === 'Enter' && autocomplete.length > 0)
      return selectLocation(autocomplete[highlightedIndex]);
  };

  // on list element clicked get geolocation details and search (copied)
  const selectLocation = (location: Autocomplete): void => {
    const locationName: string = location.name;
    const lat: number = location.lat;
    const lon: number = location.lon;
    displayLocationData(locationName, lat, lon);
  };

  // set relevant setters to display location data
  const displayLocationData = (
    location: string,
    lat: number,
    lon: number
  ): void => {
    setAutocomplete([]);
    setLongitude(lon);
    setLatitude(lat);
    setLocation(location);
  };

  return (
    <>
      <input
        autoComplete="off"
        autoFocus
        id="location"
        placeholder="@location"
        onChange={searchLocations}
        value={location}
        onBlur={clearLocationList}
        onKeyDown={handleKeyDown}
      ></input>
      <ul className="locations">
        {autocomplete ? (
          <LocationList
            autocomplete={autocomplete}
            highlightedIndex={highlightedIndex}
            displayLocationData={displayLocationData}
          />
        ) : null}
      </ul>
    </>
  );
}
