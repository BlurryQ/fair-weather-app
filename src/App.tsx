import { useState } from 'react';
import './App.css';

// components
import Header from './components/Header';

// props
import { WeatherDataProp } from './types/WeatherDataProp';

// types
import HourlyWeather from './components/HourlyWeather';
import Loader from './components/Loader';
import DayOverview from './components/DayOverview';

function App(): JSX.Element {
  const [loading, setLoading] = useState<boolean>(false);
  const [weatherData, setWeatherData] = useState<WeatherDataProp | null>(null);
  const [chosenDay, setChosenDay] = useState<number>(0);

  return (
    <>
      <Header setWeatherData={setWeatherData} setLoading={setLoading} />

      <main>
        {loading ? (
          <Loader />
        ) : (
          <>
            <DayOverview weatherData={weatherData} chosenDay={chosenDay} />
            <HourlyWeather
              weatherData={weatherData}
              chosenDay={chosenDay}
              setChosenDay={setChosenDay}
            />
          </>
        )}
      </main>
    </>
  );
}

export default App;
