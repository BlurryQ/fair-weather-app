import '../styles/forecast.css';
import React, { useEffect, useState } from 'react';

// types
import { HourProp } from '../types/HourProp';

export default function WeatherTable({
  hour,
  temperature,
  setTemperature,
}: {
  hour: HourProp;
  temperature: number;
  setTemperature: React.Dispatch<React.SetStateAction<number>>;
}): JSX.Element | null {
  if (!hour) return null;
  const [condition, setCondition] = useState<string>('');
  const [rain, setRain] = useState<number>(0);
  const [rainChance, setRainChance] = useState<number>(0);
  const [snow, setSnow] = useState<number>(0);
  const [snowChance, setSnowChance] = useState<number>(0);
  const [feelsLike, setFeelsLike] = useState<number>(0);
  const [windSpeed, setWindSpeed] = useState<number>(0);
  const [uvIndex, setUvIndex] = useState<number>(0);
  const [visability, setVisability] = useState<number>(0);

  const setWeatherData = (hour: HourProp) => {
    const {
      chance_of_rain,
      chance_of_snow,
      condition,
      feelslike_c,
      feelslike_f,
      wind_mph,
      wind_kph,
      temp_c,
      temp_f,
      time,
      time_epoch,
      uv,
      vis_miles,
      vis_km,
      will_it_rain,
      will_it_snow,
    } = hour;

    // TODO: if user chooses celcius/fahrenheit set appropriate values
    const temp: number = temp_c;
    const feelsLikeTemp: number = feelslike_c;

    // TODO: if user chooses miles/kilometer set appropriate values
    const wind: number = wind_mph;
    const visability: number = vis_miles;

    setCondition(condition.text);
    setRain(will_it_rain);
    setRainChance(chance_of_rain);
    setSnow(will_it_snow);
    setSnowChance(chance_of_snow);
    setTemperature(temp);
    setFeelsLike(feelsLikeTemp);
    setWindSpeed(wind);
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
          <th colSpan={2} className="table-header">
            {condition}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th>Rain:</th>
          <td>
            {' '}
            {rain ? 'Yes' : 'No'} ({rainChance}%)
          </td>
        </tr>
        <tr>
          <th>Snow:</th>
          <td>
            {' '}
            {snow ? 'Yes' : 'No'} ({snowChance}%)
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
          <td>{windSpeed} mph</td>
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
