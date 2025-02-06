import { useState } from 'react';
import './App.css';

// components
import Header from './assets/components/Header';

// props
import { WeatherDataProp } from './assets/types/WeatherDataProp';

// types
import HourlyWeather from './assets/components/HourlyWeather';
import Loader from './assets/components/Loader';
import DayOverview from './assets/components/DayOverview';

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
