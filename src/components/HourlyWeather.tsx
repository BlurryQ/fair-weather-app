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
import { useUser } from '../context/UserContext';
import { CoreSettings } from '../types/settings/CoreSettings';

export default function HourlyWeather({
  weatherData,
  chosenDay,
  setChosenDay,
}: {
  weatherData: WeatherDataProp | null;
  chosenDay: number;
  setChosenDay: React.Dispatch<SetStateAction<number>>;
}): JSX.Element | null {
  const userContext = useUser();
  const [chosenHour, setChosenHour] = useState<number>(1);
  const [weatherArray, setWeatherArray] = useState<HourProp[]>([]);
  // dateEpoch needed here to keep dateSelectors dates synchronised
  const [dateEpoch, setDateEpoch] = useState<number>(Date.now());

  const coreSettings: CoreSettings | number =
    userContext?.user?.settings?.coreSettings ?? 0;

  useEffect(() => {
    if (!weatherData) return;
    const chosenDaysHours: HourProp[] | null =
      weatherData.forecast.forecastday[chosenDay].hour;

    const validHours: HourProp[] = chosenDaysHours.filter((hours) =>
      removeUnwantedHours(hours, coreSettings)
    );
    setWeatherArray(validHours);
  }, [weatherData, chosenDay]);

  if (!userContext) return null;

  const dateSelectorProp: DateSelectorProp = {
    chosenDay,
    setChosenDay,
    setChosenHour,
    dateEpoch,
    setDateEpoch,
  };

  return (
    <>
      <DateSelector top={true} dateSelectorProp={dateSelectorProp} />
      {weatherArray.length < 1 ? null : (
        <>
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
