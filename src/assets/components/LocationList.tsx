import '../styles/location.css';

// types
import { Autocomplete } from '../types/Autocomplete';
import { LocationListProp } from '../types/LocationListProp';

export default function LocationList(
  locationListProps: LocationListProp
): JSX.Element {
  // on list element clicked get geolocation details and search
  const selectLocation = (e: any): void => {
    const location: string = e.target.textContent;
    const latLon: string = e.target.attributes.value.value;
    const [lat, lon]: string[] = latLon.split(' ');
    displayLocationData(location, lat, lon)
  };

  const {
    autocomplete,
    highlightedIndex,
    displayLocationData
  } = locationListProps;
  
  return <>
    {autocomplete.length > 0
    ? autocomplete.map((location: Autocomplete, index: number) => {
        return (
          <li
            key={location.id}
            value={`${location.lat} ${location.lon}`}
            onClick={selectLocation}
            className={highlightedIndex === index ? "selected" : ""}
          >
            {location.name}, {location.region}
          </li>
        );
      })
    : null}
    </>
}
