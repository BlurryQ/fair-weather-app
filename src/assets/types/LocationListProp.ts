import { Autocomplete } from './Autocomplete';

export type LocationListProp = {
  autocomplete: Autocomplete[];
  setAutocomplete: React.Dispatch<React.SetStateAction<Autocomplete[]>>;
  setLocation: React.Dispatch<React.SetStateAction<string>>;
  setLongitude: React.Dispatch<React.SetStateAction<number>>;
  setLatitude: React.Dispatch<React.SetStateAction<number>>;
  highlightedIndex: number,
};

