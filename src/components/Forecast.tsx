import '../styles/forecast.css';
import { useEffect, useState } from 'react';

// components
import DogGrid from './DogGrid';
import NavButtons from './NavButtons';
import WeatherTable from './WeatherTable';

// types
import { ForecastProp } from '../types/ForecastProp';
import { HourProp } from '../types/HourProp';

// utils
import getClassName from '../utils/getClassName';
import getImages from '../utils/getImages';
import showWeatherDetails from '../utils/showWeatherDetails';

export default function Forecast(
  forecastProp: ForecastProp
): JSX.Element | null {
  const { hour, index, chosenHour, setChosenHour, displayNavButton } =
    forecastProp;
  if (!hour) return null;
  const [condition, setCondition] = useState<string>('');
  const [conditionIcon, setConditionIcon] = useState<string>('');

  const setWeatherData = (hour: HourProp) => {
    const weather: string = hour.condition.text;
    const iconData: string = hour.condition.icon;
    const iconURL: string = iconData.substring(2);
    setCondition(weather);
    setConditionIcon(`https://${iconURL}`);
  };

  useEffect(() => {
    if (!hour) return;
    setWeatherData(hour);
  }, [hour]);

  const today: Date = new Date(hour.time_epoch * 1000);
  const todaysHours: number = today.getHours();
  const images: string[] = getImages(hour);
  const className = getClassName(index, hour.placeholder);

  return (
    <div
      data-hour-id={hour.time_epoch}
      onClick={showWeatherDetails}
      className={className}
    >
      <span data-hour-id={hour.time_epoch} className="weather-overview">
        <p className="time">{todaysHours}:00</p>
        {conditionIcon ? (
          <img
            alt={condition}
            src={conditionIcon}
            className="weather-icon"
          ></img>
        ) : null}
        <p className="temp">{hour.temp_c}°C </p>
      </span>

      <WeatherTable hour={hour} />

      <DogGrid hour={hour} images={images} />

      <span id="carrat" className="down"></span>
      <table id="weather-details-mobile"></table>

      {index === 2 ? (
        <NavButtons
          chosenHour={chosenHour}
          setChosenHour={setChosenHour}
          displayNavButton={displayNavButton}
        />
      ) : null}
    </div>
  );
}
