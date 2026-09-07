import '../styles/forecast.css';
import { useEffect, useState } from 'react';

// types
import { HourProp } from '../types/HourProp';
import { useUser } from '../context/UserContext';

export default function WeatherTable({
  hour,
}: {
  hour: HourProp;
}): JSX.Element | null {
  const [weatherData, setWeatherData] = useState<HourProp | null>(null);
  const userContext = useUser();
  const user = userContext?.user;
  const useCelcius: boolean = user?.settings?.coreSettings?.is_celsius ?? true;
  const useMiles: boolean = user?.settings?.coreSettings?.is_miles ?? true;

  const getWeatherDataMetrics = (hour: HourProp) => {
    const {
      feelslike_c,
      feelslike_f,
      wind_mph,
      wind_kph,
      temp_c,
      temp_f,
      vis_miles,
      vis_km,
    } = hour;

    const temp: string = useCelcius
      ? `${temp_c}°C (${feelslike_c}°C)`
      : `${temp_f}°F (${feelslike_f}°F)`;

    const wind: string = useMiles ? wind_mph + 'mph' : wind_kph + 'kmh';
    const visability: string = useMiles
      ? vis_miles + ' miles'
      : vis_km + ' kilometers';

    setWeatherData({
      ...hour,
      temperature: temp,
      windSpeed: wind,
      visability: visability,
    });
  };

  useEffect(() => {
    if (!hour) return;
    getWeatherDataMetrics(hour);
  }, [hour]);

  if (!userContext || !hour) return null;

  return weatherData ? (
    <table id="weather-details-desktop">
      <thead>
        <tr>
          <th colSpan={2} className="table-header">
            {weatherData.condition.text}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th>Rain:</th>
          <td>
            {' '}
            {weatherData.will_it_rain ? 'Yes' : 'No'}
            {weatherData.chance_of_rain
              ? ` (${weatherData.chance_of_rain}%)`
              : ''}
          </td>
        </tr>
        <tr>
          <th>Snow:</th>
          <td>
            {' '}
            {weatherData.will_it_snow ? 'Yes' : 'No'}
            {weatherData.chance_of_snow
              ? ` (${weatherData.chance_of_snow}%)`
              : ''}
          </td>
        </tr>
        <tr>
          <th>Temp:</th>
          <td>{weatherData.temperature}</td>
        </tr>
        <tr>
          <th>Wind:</th>
          <td>{weatherData.windSpeed}</td>
        </tr>
        <tr>
          <th>View:</th>
          <td>{weatherData.visability}</td>
        </tr>
        <tr>
          <th>UV:</th>
          <td>{weatherData.uv}</td>
        </tr>
      </tbody>
    </table>
  ) : (
    <></>
  );
}
