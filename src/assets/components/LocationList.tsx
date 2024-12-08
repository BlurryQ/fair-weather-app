import "../../styles/location.css";

// types
import { Autocomplete } from "../../types/Autocomplete";
type LocationListProps = {
  autocomplete: Autocomplete[];
  setAutocomplete: React.Dispatch<React.SetStateAction<Autocomplete[] | null>>;
  setLocation: React.Dispatch<React.SetStateAction<string>>;
  setLongitude: React.Dispatch<React.SetStateAction<number>>;
  setLatitude: React.Dispatch<React.SetStateAction<number>>;
};

export default function LocationList({
  autocomplete,
  setAutocomplete,
  setLocation,
  setLongitude,
  setLatitude,
}: LocationListProps): JSX.Element {
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
      {/* if only one location returned, display it */}
      {autocomplete.length === 1 ? (
        <li
          key={autocomplete[0].id}
          value={`${autocomplete[0].lat} ${autocomplete[0].lon}`}
          onClick={selectLocation}
        >
          {autocomplete[0].name}, {autocomplete[0].region}
        </li>
      ) : (
        // else loop through and display all matching results
        autocomplete.map((location: Autocomplete) => {
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
      )}
    </>
  );
}
