import '../styles/header.css';

// components
import Location from './Location';

// types
import { WeatherDataProp } from '../types/WeatherDataProp';

export default function Header({
  setWeatherData,
  setLoading,
}: {
  setWeatherData: React.Dispatch<React.SetStateAction<WeatherDataProp | null>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}): JSX.Element {
  return (
    <header>
      <h1 className="header">Fair Weather App</h1>
      <Location setWeatherData={setWeatherData} setLoading={setLoading} />
    </header>
  );
}
