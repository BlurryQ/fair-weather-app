import React, { useEffect, useState } from 'react';
import '../styles/forecast.css';

import { HourProp } from '../types/HourProp';
import getImages from '../utils/getImages';
import WeatherTable from './WeatherTable';
import showWeatherDetails from '../utils/showWeatherDetails';
import DogGrid from './DogGrid';

export default function Forecast({
  hour,
  index,
  chosenIndex,
  setChosenIndex,
}: {
  hour: HourProp;
  index: number;
  chosenIndex: number;
  setChosenIndex: React.Dispatch<React.SetStateAction<number>>;
}): JSX.Element {
  if (!hour) return <></>;
  const [condition, setCondition] = useState<string>('');
  const [conditionIcon, setConditionIcon] = useState<string>('');
  const [temperature, setTemperature] = useState<number>(0);

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

  const handleChange = (direct: string) => {
    if (direct === 'left') {
      setChosenIndex(chosenIndex - 1);
    } else {
      setTimeout(() => {
        setChosenIndex(chosenIndex + 1);
      }, 1000);
    }
  };

  const today: Date = new Date(hour.time_epoch * 1000);
  const todaysHours: number = today.getHours();
  const images: string[] = getImages(hour);

  return (
    <div
      data-hour-id={hour.time_epoch}
      onClick={showWeatherDetails}
      className="forecast"
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

      <WeatherTable
        hour={hour}
        temperature={temperature}
        setTemperature={setTemperature}
      />

      <DogGrid hour={hour} images={images} />

      <span id="carrat" className="down"></span>
      <table id="weather-details-mobile"></table>
      {index === 1 ? (
        <>
          <button onClick={() => handleChange('left')}>&lt;</button>
          <button onClick={() => handleChange('right')}>&gt;</button>
        </>
      ) : null}
    </div>
  );
}
