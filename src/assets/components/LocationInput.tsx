import { useEffect, useState } from "react";
import "../../styles/location.css";
import axios from "axios";

import LocationList from "./LocationList";

// types
import { Autocomplete } from "../../types/Autocomplete";
type LocationInputProps = {
  location: string;
  setLatitude: React.Dispatch<React.SetStateAction<number>>;
  setLocation: React.Dispatch<React.SetStateAction<string>>;
  setLongitude: React.Dispatch<React.SetStateAction<number>>;
};

export default function LocationInput({
  setLongitude,
  setLatitude,
  location,
  setLocation,
}: LocationInputProps): JSX.Element {
  const [typedLocation, setTypedLocation] = useState<string>("");
  const [autocomplete, setAutocomplete] = useState<Autocomplete[] | null>(null);

  // Once location is typed and is 4 or more chars
  useEffect(() => {
    if (typedLocation.length < 4) return;
    const api_key: string = import.meta.env.VITE_API_KEY;
    const url: string = `https://api.weatherapi.com/v1/search.json?key=${api_key}&q=${typedLocation}`;
    axios
      .get(url)
      .then((data) => {
        setAutocomplete(data.data);
      })
      .catch((err) => console.error(err));
  }, [typedLocation]);

  // on input change update input and run useEffect
  const searchLocations = (e: React.ChangeEvent<HTMLInputElement>) => {
    const entry: string = e.target.value;
    setTypedLocation(entry);
    setLocation(entry);
    setAutocomplete(null);
  };

  const clearAutocomplete = () => {
    setAutocomplete(null);
    setLocation("");
  };

  return (
    <>
      <input
        id="location"
        placeholder="@location"
        onChange={searchLocations}
        value={location}
        onBlur={clearAutocomplete}
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
