import React, { useEffect, useState } from 'react';
import '../styles/forecast.css';

import { HourProp } from '../types/HourProp';
import getImages from '../utils/getImages';
import WeatherTable from './WeatherTable';
import showWeatherDetails from '../utils/showWeatherDetails';
import DogGrid from './DogGrid';

type ForecastProp = {
  hour: HourProp;
  index: number;
  selectedIndex: number;
  setSelectedIndex: React.Dispatch<React.SetStateAction<number>>;
};

export default function Forecast({
  hour,
  index,
  selectedIndex,
  setSelectedIndex,
}: ForecastProp): JSX.Element {
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

  const handleCards = (e: any, direction: string) => {
    const oneHour: number = 60 * 60;
    const target: number = Number(
      e.target.parentNode.parentNode.dataset.weatherCard
    );

    let targetToRemove: number;
    let targetToDisplay: number = 0;
    if (direction === 'left') {
      targetToRemove = target + oneHour;
      targetToDisplay = target - oneHour;
    } else {
      targetToRemove = target - oneHour;
    }

    // console.log(targetToRemove);
    const element: HTMLFormElement = document.querySelector(
      `[data-weather-card="${targetToRemove}"]`
    ) as HTMLFormElement;
    element.style.display = 'none';

    // TODO: figure this out
    console.log('display', targetToDisplay);
    if (targetToDisplay) {
      const element: HTMLFormElement = document.querySelector(
        `[data-weather-card="${targetToDisplay}"]`
      ) as HTMLFormElement;
      element.style.display = 'block';
    }

    if (direction === 'left') setSelectedIndex(selectedIndex - 1);
    else setSelectedIndex(selectedIndex + 1);
  };

  const today: Date = new Date(hour.time_epoch * 1000);
  const todaysHours: number = today.getHours();
  const images: string[] = getImages(hour);

  let classList = 'forecast';
  if (index === selectedIndex - 1 || index === selectedIndex + 1)
    classList += ' smaller';

  return index >= selectedIndex - 1 && index <= selectedIndex + 1 ? (
    <div
      data-hour-id={hour.time_epoch}
      onClick={showWeatherDetails}
      className={classList}
    >
      {selectedIndex === index ? (
        <>
          <button
            className={`direction ${index === 1 ? 'hidden' : ''}`}
            onClick={(e) => handleCards(e, 'left')}
          >
            &lt;
          </button>
          <button
            className={`direction ${index === 10 ? 'hidden' : ''}`}
            onClick={(e) => handleCards(e, 'right')}
          >
            &gt;
          </button>
        </>
      ) : null}
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
    </div>
  ) : (
    <></>
  );
}
