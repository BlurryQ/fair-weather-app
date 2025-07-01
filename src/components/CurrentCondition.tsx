import '../styles/currentConditions.css';
import { useEffect, useState } from 'react';

// props
import { WeatherDataProp } from '../types/WeatherDataProp';
import { useUser } from '../context/UserContext';

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
  const [snow, setSnow] = useState<number>(0);
  const [snowChance, setSnowChance] = useState<number>(0);
  const [minTemperature, setMinTemperature] = useState<number>(0);
  const [maxTemperature, setMaxTemperature] = useState<number>(0);
  const [avgTemperature, setAvgTemperature] = useState<number>(0);
  const [maxWindSpeed, setMaxWindSpeed] = useState<number>(0);
  const [uvIndex, setUvIndex] = useState<number>(0);
  const [avgVisability, setAvgVisability] = useState<number>(0);

  // const [weatherData, setWeatherData] = useState<{}>({});
  //   const userContext = useUser();
  //   if (!userContext) return <></>
  //   const { user } = userContext;
  //   let useCelcius: boolean = true;
  //   let useMiles: boolean = true;
  //   if (user.hasOwnProperty('settings')) {
  //     useCelcius = user.settings?.coreSettings?.is_celsius ?? true;
  //     useMiles = user.settings?.coreSettings?.is_miles ?? true;
  //   }

  useEffect(() => {
    if (!weatherData) return;
    setWeatherData(weatherData);
  }, [weatherData, chosenDay]);

  // sets all weather data from restAPI
  const setWeatherData = (weatherData: WeatherDataProp) => {
    const {
      condition,
      avgtemp_c,
      avgtemp_f,
      mintemp_c,
      mintemp_f,
      maxtemp_c,
      maxtemp_f,
      maxwind_mph,
      maxwind_kph,
      daily_chance_of_rain,
      daily_chance_of_snow,
      daily_will_it_rain,
      daily_will_it_snow,
      uv,
      avgvis_miles,
      avgvis_km,
    } = weatherData.forecast.forecastday[chosenDay].day;

    const iconURL: string = condition.icon.substring(2);

    // TODO: if user chooses celcius/fahrenheit set appropriate values
    const tempMin: number = mintemp_c;
    const tempMax: number = maxtemp_c;
    const avgTemp: number = avgtemp_c;

    // TODO: if user chooses miles/kilometer set appropriate values
    const maxWind: number = maxwind_mph;
    const avgVisability: number = avgvis_miles;

    setCondition(condition.text);
    setConditionIcon(`https://${iconURL}`);
    setRain(daily_will_it_rain);
    setRainChance(daily_chance_of_rain);
    setSnow(daily_will_it_snow);
    setSnowChance(daily_chance_of_snow);
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
              <th>Snow:</th>
              <td>
                {snow ? 'Yes' : 'No'} ({snowChance}%)
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
              <td>{maxWindSpeed} mph</td>
            </tr>
            <tr>
              <th>Avg. View:</th>
              <td>{avgVisability} miles</td>
            </tr>
          </tbody>
        </table>
      </ul>
    </div>
  );
}
