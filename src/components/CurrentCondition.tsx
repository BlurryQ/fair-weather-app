import '../styles/currentConditions.css';
import { useEffect, useState } from 'react';

// props
import { WeatherDataProp } from '../types/WeatherDataProp';

export default function CurrentCondition({
  weatherData,
  chosenDay,
}: {
  weatherData: WeatherDataProp | null;
  chosenDay: number;
}): JSX.Element {
  const [condition, setCondition] = useState<string>('');
  const [conditionIcon, setConditionIcon] = useState<string>('');
  const [rain, setRain] = useState<number>(0);
  const [rainChance, setRainChance] = useState<number>(0);
  const [minTemperature, setMinTemperature] = useState<number>(0);
  const [maxTemperature, setMaxTemperature] = useState<number>(0);
  const [avgTemperature, setAvgTemperature] = useState<number>(0);
  const [maxWindSpeed, setMaxWindSpeed] = useState<number>(0);
  const [uvIndex, setUvIndex] = useState<number>(0);
  const [avgVisability, setAvgVisability] = useState<number>(0);

  useEffect(() => {
    if (!weatherData) return;
    setWeatherData(weatherData);
  }, [weatherData, chosenDay]);

  // sets all weather data from restAPI
  const setWeatherData = (weatherData: WeatherDataProp) => {
    const weatherObj = weatherData.forecast.forecastday[chosenDay].day;
    const weather: string = weatherObj.condition.text;
    const iconData: string = weatherObj.condition.icon;
    const iconURL: string = iconData.substring(2);
    const avgTemp: number = weatherObj.avgtemp_c;
    const tempMin: number = weatherObj.mintemp_c;
    const tempMax: number = weatherObj.maxtemp_c;
    const maxWind: number = weatherObj.maxwind_mph;
    const rainChance: number = weatherObj.daily_chance_of_rain;
    const rain: number = weatherObj.daily_will_it_rain;
    const uv: number = weatherObj.uv;
    const avgVisability: number = weatherObj.avgvis_miles;
    setCondition(weather);
    setConditionIcon(`https://${iconURL}`);
    setRain(rain);
    setRainChance(rainChance);
    setMinTemperature(tempMin);
    setMaxTemperature(tempMax);
    setAvgTemperature(avgTemp);
    setMaxWindSpeed(maxWind);
    setUvIndex(uv);
    setAvgVisability(avgVisability);
  };

  return (
    <div className="current-conditions">
      <ul>
        <li className="time">
          {chosenDay === 0
            ? 'Today'
            : chosenDay === 1
            ? 'Tomorrow'
            : 'Day After'}
        </li>
        <li>UV: {uvIndex}</li>
        {conditionIcon ? (
          <img
            alt={condition}
            src={conditionIcon}
            className="weather-icon"
          ></img>
        ) : null}
        <table>
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
                {rain ? 'Yes' : 'No'} ({rainChance}%)
              </td>
            </tr>
            <tr>
              <th>Avg. Temp:</th>
              <td>{avgTemperature}°C</td>
            </tr>
            <tr>
              <th>Temp Range:</th>
              <td>
                {minTemperature}°C - {maxTemperature}°C
              </td>
            </tr>
            <tr>
              <th>Wind:</th>
              <td>{maxWindSpeed}mph</td>
            </tr>
            <tr>
              <th>Avg. View:</th>
              <td>{avgVisability} miles</td>
            </tr>
          </tbody>
        </table>

        {/*         <li>{condition}</li>
        <li>
          Rain: {rain ? "Yes" : "No"} ({rainChance}%)
        </li>
        <li>Avg. Temp: {avgTemperature}°C</li>
        <li>
          Temp Range: {minTemperature}°C - {maxTemperature}°C
        </li>
        <li>Max Wind: {maxWindSpeed}mph</li>
        <li>Avg. Visability: {avgVisability} miles</li> */}
      </ul>
    </div>
  );
}
