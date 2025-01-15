import { useEffect, useState } from "react";
import "../../styles/forecast.css";

import { HourProp } from "../types/HourProp";
import getImages from "../utils/getImages";
import WeatherTable from "./WeatherTable";
import showWeatherDetails from "../utils/showWeatherDetails";

type Forecast = {
  hour: HourProp;
  tommorowBG: boolean;
};

export default function Forecast({ hour, tommorowBG }: Forecast): JSX.Element {
  if (!hour) return <></>;
  const [condition, setCondition] = useState<string>("");
  const [conditionIcon, setConditionIcon] = useState<string>("");

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
      className={`forecast ${tommorowBG ? "tommorowBG" : ""}`}
    >
      <span data-hour-id={hour.time_epoch}>
        <p className="time">{todaysHours}:00</p>
        {conditionIcon ? <img alt={condition} src={conditionIcon}></img> : null}
      </span>

      <WeatherTable hour={hour} />

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
