import { useEffect, useState } from "react";
import "../../styles/forecast.css";

import { HourProp } from "../types/HourProp";
import getImages from "../utils/getImages";
import WeatherTable from "./WeatherTable";
import showWeatherDetails from "../utils/showWeatherDetails";

export default function Forecast({ hour }: { hour: HourProp }): JSX.Element {
  if (!hour) return <></>;
  const [condition, setCondition] = useState<string>("");
  const [conditionIcon, setConditionIcon] = useState<string>("");
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

      <div data-hour-id={hour.time_epoch} className="weather-images">
        {images.map((image) => {
          const alt = image.split("/")[2];
          return <img key={image} className="dog" src={image} alt={alt} />;
        })}
      </div>

      <span id="carrat" className="down"></span>
      <table id="weather-details-mobile"></table>
    </div>
  );
}
