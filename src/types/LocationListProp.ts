import { Autocomplete } from './Autocomplete';

export type LocationListProp = {
  autocomplete: Autocomplete[];
  highlightedIndex: number,
  displayLocationData: (location: string, lat: number, lon: number) => void
};

