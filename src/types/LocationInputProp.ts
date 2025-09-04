import { Coords } from "./Coords";

export type LocationInputProp = {
    location: string;
    setCoords: React.Dispatch<React.SetStateAction<Coords>>;
    setLocation: React.Dispatch<React.SetStateAction<string>>;
    setError: React.Dispatch<React.SetStateAction<boolean>>;
  };