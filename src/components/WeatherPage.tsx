import HourlyWeather from './HourlyWeather';
import DayOverview from './DayOverview';
import { useState } from 'react';
import { WeatherDataProp } from '../types/WeatherDataProp';

export default function WeatherPage({
  weatherData,
}: {
  weatherData: WeatherDataProp | null;
}) {
  const [chosenDay, setChosenDay] = useState<number>(0);
  if (!weatherData) return;

  return (
    <>
      <DayOverview weatherData={weatherData} chosenDay={chosenDay} />
      <HourlyWeather
        weatherData={weatherData}
        chosenDay={chosenDay}
        setChosenDay={setChosenDay}
      />
    </>
  );
}
