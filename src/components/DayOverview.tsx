import { useState, useEffect } from 'react';

// components
import CurrentCondition from './CurrentCondition';
import SunInfo from './SunInfo';

// props
import { SunInfoProp } from '../types/SunInfoProp';
import { WeatherDataProp } from '../types/WeatherDataProp';

export default function DayOverview({
  weatherData,
  chosenDay,
}: {
  weatherData: WeatherDataProp | null;
  chosenDay: number;
}): JSX.Element {
  const [sunriseTime, setSunriseTime] = useState<SunInfoProp | null>(null);
  const [sunsetTime, setSunsetTime] = useState<SunInfoProp | null>(null);

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
  }, [weatherData, chosenDay]);

  const noWeatherData: boolean = !weatherData || !sunriseTime || !sunsetTime;

  return (
    <>
      {noWeatherData ? (
        <h2 className="loading">Click the pin or enter your location...</h2>
      ) : (
        <div className="current-overview">
          <SunInfo sunData={sunriseTime} />
          <CurrentCondition weatherData={weatherData} chosenDay={chosenDay} />
          <SunInfo sunData={sunsetTime} />
        </div>
      )}
    </>
  );
}
