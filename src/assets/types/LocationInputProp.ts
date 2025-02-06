export type LocationInputProp = {
    location: string;
    setLatitude: React.Dispatch<React.SetStateAction<number>>;
    setLocation: React.Dispatch<React.SetStateAction<string>>;
    setLongitude: React.Dispatch<React.SetStateAction<number>>;
  };