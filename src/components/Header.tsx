import '../styles/header.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';

// components
import Location from './Location';
import NavBar from './NavBar';

// types
import { WeatherDataProp } from '../types/WeatherDataProp';
import { Coords } from '../types/Coords';
import { ResetSearch } from '../types/ResetSearch';

export default function Header({
  setWeatherData,
  setLoading,
}: {
  setWeatherData: React.Dispatch<React.SetStateAction<WeatherDataProp | null>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}): JSX.Element {
  const [coords, setCoords] = useState<Coords>({ lon: 0, lat: 0 });

  const resetSearch: ResetSearch = () => {
    setWeatherData(null);
    setCoords({ lon: 0, lat: 0 });
  };

  return (
    <header>
      <div className="header">
        <NavBar resetSearch={resetSearch} />
        <h1>
          <Link to="/" id="title" onClick={resetSearch}>
            Fair Weather App
          </Link>
        </h1>
      </div>
      <Location
        setWeatherData={setWeatherData}
        setLoading={setLoading}
        coords={coords}
        setCoords={setCoords}
      />
    </header>
  );
}
