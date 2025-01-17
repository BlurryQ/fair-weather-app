import React, { useEffect, useState } from "react";
import "../../styles/forecast.css";

import { HourProp } from "../types/HourProp";

export default function WeatherTable({
  hour,
  temperature,
  setTemperature,
}: {
  hour: HourProp;
  temperature: number;
  setTemperature: React.Dispatch<React.SetStateAction<number>>;
}): JSX.Element {
  if (!hour) return <></>;
  const [condition, setCondition] = useState<string>("");
  const [rain, setRain] = useState<number>(0);
  const [rainChance, setRainChance] = useState<number>(0);
  const [feelsLike, setFeelsLike] = useState<number>(0);
  const [windSpeed, setWindSpeed] = useState<number>(0);
  const [gustSpeed, setgustSpeed] = useState<number>(0);
  const [uvIndex, setUvIndex] = useState<number>(0);
  const [visability, setVisability] = useState<number>(0);

  const setWeatherData = (hour: HourProp) => {
    const weather: string = hour.condition.text;
    const temp: number = hour.temp_c;
    const tempLike: number = hour.feelslike_c;
    const wind: number = hour.wind_mph;
    const rainChance: number = hour.chance_of_rain;
    const rain: number = hour.will_it_rain;
    const gust: number = hour.gust_mph;
    const uv: number = hour.uv;
    const visability: number = hour.vis_miles;
    setCondition(weather);
    setRain(rain);
    setRainChance(rainChance);
    setTemperature(temp);
    setFeelsLike(tempLike);
    setWindSpeed(wind);
    setgustSpeed(gust);
    setUvIndex(uv);
    setVisability(visability);
  };

  useEffect(() => {
    if (!hour) return;
    setWeatherData(hour);
  }, [hour]);

  return (
    <table id="weather-details-desktop">
      <thead>
        <tr>
          <th colSpan={2}>{condition}</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th>Rain:</th>
          <td>
            {" "}
            {rain ? "Yes" : "No"} ({rainChance}%)
          </td>
        </tr>
        <tr>
          <th>Temp:</th>
          <td>
            {temperature}°C ({feelsLike}°C)
          </td>
        </tr>
        <tr>
          <th>Wind:</th>
          <td>
            {windSpeed}mph ({gustSpeed}mph)
          </td>
        </tr>
        <tr>
          <th>View:</th>
          <td>{visability} miles</td>
        </tr>
        <tr>
          <th>UV:</th>
          <td>{uvIndex}</td>
        </tr>
      </tbody>
    </table>
  );
}
