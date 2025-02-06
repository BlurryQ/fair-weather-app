import React, { SetStateAction, useEffect, useState } from 'react';

// components
import DateSelector from './DateSelector';
import HourlyWeatherCard from './HourlyWeatherCard';

// types
import { DateSelectorProp } from '../types/DateSelectorProp';
import { HourProp } from '../types/HourProp';
import { WeatherDataProp } from '../types/WeatherDataProp';

// utils
import removeUnwantedHours from '../utils/removeUnwantedHours';

export default function HourlyWeather({
  weatherData,
  chosenDay,
  setChosenDay,
}: {
  weatherData: WeatherDataProp | null;
  chosenDay: number;
  setChosenDay: React.Dispatch<SetStateAction<number>>;
}): JSX.Element | null {
  const [chosenHour, setChosenHour] = useState<number>(1);
  const [weatherArray, setWeatherArray] = useState<HourProp[]>([]);
  // dateEpoch needed here to keep dateSelectors dates synchronised
  const [dateEpoch, setDateEpoch] = useState<number>(Date.now());

  useEffect(() => {
    if (!weatherData) return;
    const chosenDaysHours: HourProp[] | null =
      weatherData.forecast.forecastday[chosenDay].hour;

    const validHours: HourProp[] = chosenDaysHours.filter(removeUnwantedHours);
    setWeatherArray(validHours);
  }, [weatherData, chosenDay]);

  const dateSelectorProp: DateSelectorProp = {
    chosenDay,
    setChosenDay,
    setChosenHour,
    dateEpoch,
    setDateEpoch,
  };

  return (
    <>
      {weatherArray.length < 1 ? null : (
        <>
          <DateSelector top={true} dateSelectorProp={dateSelectorProp} />
          <HourlyWeatherCard
            weatherArray={weatherArray}
            chosenHour={chosenHour}
            setChosenHour={setChosenHour}
          />
          <DateSelector top={false} dateSelectorProp={dateSelectorProp} />
        </>
      )}
    </>
  );
}
