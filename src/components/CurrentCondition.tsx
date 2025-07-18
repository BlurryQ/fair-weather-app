import '../styles/currentConditions.css';
import { useEffect, useState } from 'react';

// props
import { WeatherDataProp } from '../types/WeatherDataProp';
import { useUser } from '../context/UserContext';
import { DayOverview } from '../types/DayOverview';

export default function CurrentCondition({
  weatherData,
  chosenDay,
}: {
  weatherData: WeatherDataProp | null;
  chosenDay: number;
}): JSX.Element {
  const [overviewData, setOverviewData] = useState<{}>({});
  const userContext = useUser();
  if (!userContext) return <></>;
  const { user } = userContext;
  let useCelcius: boolean = true;
  let useMiles: boolean = true;
  if (user.hasOwnProperty('settings')) {
    useCelcius = user.settings?.coreSettings?.is_celsius ?? true;
    useMiles = user.settings?.coreSettings?.is_miles ?? true;
  }

  useEffect(() => {
    if (!weatherData) return;
    setWeatherData(weatherData);
  }, [weatherData, chosenDay]);

  // sets all weather data from restAPI
  const setWeatherData = (weatherData: WeatherDataProp) => {
    const chosenDaysWeather: DayOverview =
      weatherData.forecast.forecastday[chosenDay].day;

    const iconURL: string =
      'https://' + chosenDaysWeather.condition.icon.substring(2);

    const avgTemp: string = useCelcius
      ? `${chosenDaysWeather.avgtemp_c}°C`
      : `${chosenDaysWeather.avgtemp_f}°F`;

    const tempRange: string = useCelcius
      ? `${chosenDaysWeather.mintemp_c}°C (${chosenDaysWeather.maxtemp_c}°C)`
      : `${chosenDaysWeather.mintemp_f}°F (${chosenDaysWeather.maxtemp_f}°F)`;

    const wind: string = useMiles
      ? chosenDaysWeather.maxwind_mph + 'mph'
      : chosenDaysWeather.maxwind_mph + 'kmh';
    const visability: string = useMiles
      ? chosenDaysWeather.avgvis_miles + ' miles'
      : chosenDaysWeather.avgvis_km + ' kilometers';

    setOverviewData({
      ...chosenDaysWeather,
      iconURL,
      avgTemp,
      tempRange,
      wind,
      visability,
    });
  };

  return (
    overviewData.hasOwnProperty('condition') && (
      <div className="current-conditions">
        <ul>
          <li className="time">
            {chosenDay === 0
              ? 'Today'
              : chosenDay === 1
              ? 'Tomorrow'
              : 'Day After'}
          </li>
          <li>UV: {overviewData.uv}</li>
          {overviewData.iconURL ? (
            <img
              alt={overviewData.condition.text}
              src={overviewData.iconURL}
              className="weather-icon"
            ></img>
          ) : null}
          <table>
            <thead>
              <tr>
                <th colSpan={2} className="table-header">
                  {overviewData.condition.text}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>Rain:</th>
                <td>
                  {overviewData.daily_will_it_rain ? 'Yes' : 'No'} (
                  {overviewData.daily_chance_of_rain}%)
                </td>
              </tr>
              <tr>
                <th>Snow:</th>
                <td>
                  {overviewData.daily_will_it_snow ? 'Yes' : 'No'} (
                  {overviewData.daily_chance_of_snow}%)
                </td>
              </tr>
              <tr>
                <th>Avg. Temp:</th>
                <td>{overviewData.avgTemp}</td>
              </tr>
              <tr>
                <th>Temp Range:</th>
                <td>{overviewData.tempRange}</td>
              </tr>
              <tr>
                <th>Max Wind:</th>
                <td>{overviewData.wind}</td>
              </tr>
              <tr>
                <th>Avg. View:</th>
                <td>{overviewData.visability}</td>
              </tr>
            </tbody>
          </table>
        </ul>
      </div>
    )
  );
}
