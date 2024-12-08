import { useEffect, useState } from "react";
import "../../styles/location.css";
import axios from "axios";

// types
import { Autocomplete } from "../../types/Autocomplete";
type LocationInputProps = {
  setLongitude: React.Dispatch<React.SetStateAction<number>>;
  setLatitude: React.Dispatch<React.SetStateAction<number>>;
  location: string;
  setLocation: React.Dispatch<React.SetStateAction<string>>;
};

export default function LocationInput({
  setLongitude,
  setLatitude,
  location,
  setLocation,
}: LocationInputProps): JSX.Element {
  const [typedLocation, setTypedLocation] = useState<string>("");
  const [autocomplete, setAutocomplete] = useState<
    Autocomplete | Autocomplete[] | null
  >(null);

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
  };

  // on list element clicked get geolocation details and search
  const selectLocation = (e: any) => {
    const location: string = e.target.textContent;
    const latLon: string = e.target.attributes.value.value;
    const [lat, lon]: string[] = latLon.split(" ");
    setAutocomplete(null);
    setLongitude(Number(lon));
    setLatitude(Number(lat));
    setLocation(location);
  };

  return (
    <>
      <input
        id="location"
        placeholder="@location"
        onChange={searchLocations}
        value={location}
      ></input>
      <ul className="locations">
        {Array.isArray(autocomplete) && autocomplete.length > 3
          ? autocomplete.map((location: Autocomplete) => {
              return (
                <li
                  key={location.id}
                  value={`${location.lat} ${location.lon}`}
                  onClick={selectLocation}
                >
                  {location.name}, {location.region}
                </li>
              );
            })
          : null}
      </ul>
    </>
  );
}
