import '../styles/header.css';

// components
import Location from './Location';

// types
import { WeatherDataProp } from '../types/WeatherDataProp';
import NavBar from './NavBar';
import { Link } from 'react-router-dom';

export default function Header({
  setWeatherData,
  setLoading,
}: {
  setWeatherData: React.Dispatch<React.SetStateAction<WeatherDataProp | null>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}): JSX.Element {
  return (
    <header>
      <div className="header">
        <NavBar />
        <h1>
          <Link to="/" id="title">
            Fair Weather App
          </Link>
        </h1>
      </div>
      <Location setWeatherData={setWeatherData} setLoading={setLoading} />
    </header>
  );
}
