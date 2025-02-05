import { format } from 'date-fns';
import { useEffect, useState } from 'react';
import './App.css';

// react components
import Header from './assets/components/Header';
import SunInfo from './assets/components/SunInfo';
import CurrentCondition from './assets/components/CurrentCondition';

// utils
import removeUnwantedHours from './assets/utils/removeUnwantedHours';

// types
import { SunInfoProp } from './assets/types/SunInfoProp';
import { WeatherDataProp } from './assets/types/WeatherDataProp';
import Location from './assets/components/Location';
import HourlyWeather from './assets/components/HourlyWeather';
import DateSelector from './assets/components/DateSelector';
import { DateSelectorProp } from './assets/types/DateSelectorProp';
import { HourProp } from './assets/types/HourProp';

function App() {
  const [loading, setLoading] = useState<boolean>(false);
  const [sunriseTime, setSunriseTime] = useState<SunInfoProp | null>(null);
  const [sunsetTime, setSunsetTime] = useState<SunInfoProp | null>(null);
  const [weatherData, setWeatherData] = useState<WeatherDataProp | null>(null);
  const [chosenDay, setChosenDay] = useState<number>(0);
  const [chosenHour, setChosenHour] = useState<number>(1);
  const [dateEpoch, setDateEpoch] = useState<number>(Date.now());
  const [dateString, setDateString] = useState<string>(
    format(Date.now(), 'EEE MMM do yyyy')
  );

  const dateSelectorProp: DateSelectorProp = {
    chosenDay,
    setChosenDay,
    dateEpoch,
    setDateEpoch,
    dateString,
    setDateString,
    setChosenHour,
  };

  const [threeDayWeather, setThreeDayWeather] = useState<HourProp[][] | null>(
    null
  );

  useEffect(() => {
    if (!weatherData) return;
    const sunrise: SunInfoProp = {
      time: weatherData.forecast.forecastday[chosenDay].astro.sunrise,
      type: 'rise',
    };
    const sunset: SunInfoProp = {
      time: weatherData.forecast.forecastday[chosenDay].astro.sunset,
      type: 'set',
    };
    setSunriseTime(sunrise);
    setSunsetTime(sunset);

    const todaysHours: HourProp[] | null =
      weatherData.forecast.forecastday[0].hour;
    const tomorrowsHours: HourProp[] | null =
      weatherData.forecast.forecastday[1].hour;
    const dayAftersHours: HourProp[] | null =
      weatherData.forecast.forecastday[2].hour;

    const forecast: HourProp[][] = [
      todaysHours,
      tomorrowsHours,
      dayAftersHours,
    ].map(removeUnwantedHours);
    setThreeDayWeather(forecast);
  }, [weatherData, chosenDay]);

  return (
    <>
      <header>
        <Header />
        <Location setWeatherData={setWeatherData} setLoading={setLoading} />
      </header>

      <main>
        <div className="current-overview">
          {loading ? (
            <h2>Loading data...</h2>
          ) : !weatherData || !sunriseTime || !sunsetTime ? (
            <h2>Click the pin or enter your location...</h2>
          ) : (
            <>
              <SunInfo sunData={sunriseTime} />
              <CurrentCondition
                weatherData={weatherData}
                chosenDay={chosenDay}
              />
              <SunInfo sunData={sunsetTime} />
            </>
          )}
        </div>
        {threeDayWeather && !loading ? (
          <>
            <DateSelector top={true} dateSelectorProp={dateSelectorProp} />
            <HourlyWeather
              hours={threeDayWeather[chosenDay]}
              chosenHour={chosenHour}
              setChosenHour={setChosenHour}
            />
            <DateSelector top={false} dateSelectorProp={dateSelectorProp} />
          </>
        ) : null}
      </main>
    </>
  );
}

export default App;
