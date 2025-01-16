import { useEffect, useState } from "react";
import "./App.css";

// react components
import Header from "./assets/components/Header";
import SunInfo from "./assets/components/SunInfo";
import CurrentCondition from "./assets/components/CurrentCondition";

// utils
import removeUnwantedHours from "./assets/utils/removeUnwantedHours";

// types
import { SunInfoProp } from "./assets/types/SunInfoProp";
import { WeatherDataProp } from "./assets/types/WeatherDataProp";
import Location from "./assets/components/Location";
import { HoursOverview } from "./assets/types/HoursOverview";
import HourlyWeather from "./assets/components/HourlyWeather";
import DateSelector from "./assets/components/DateSelector";
import { DateSelectorProp } from "./assets/types/DateSelectorProp";

function App() {
  const [sunriseTime, setSunriseTime] = useState<SunInfoProp | null>(null);
  const [sunsetTime, setSunsetTime] = useState<SunInfoProp | null>(null);
  const [weatherData, setWeatherData] = useState<WeatherDataProp | null>(null);

  const [chosenIndex, setChosenIndex] = useState<number>(0);
  const [dateEpoch, setDateEpoch] = useState<number>(Date.now());
  const [dateString, setDateString] = useState<string>(
    new Date().toDateString()
  );

  const dateSelectorProp: DateSelectorProp = {
    chosenIndex,
    setChosenIndex,
    dateEpoch,
    setDateEpoch,
    dateString,
    setDateString,
  };

  const [threeDayWeather, setThreeDayWeather] = useState<
    HoursOverview[] | null
  >(null);

  useEffect(() => {
    if (!weatherData) return;
    const sunrise: SunInfoProp = {
      time: weatherData.forecast.forecastday[0].astro.sunrise,
      type: "rise",
    };
    const sunset: SunInfoProp = {
      time: weatherData.forecast.forecastday[0].astro.sunset,
      type: "set",
    };
    setSunriseTime(sunrise);
    setSunsetTime(sunset);

    const todaysHours: HoursOverview | null =
      weatherData.forecast.forecastday[0].hour;
    const tomorrowsHours: HoursOverview | null =
      weatherData.forecast.forecastday[1].hour;
    const dayAftersHours: HoursOverview | null =
      weatherData.forecast.forecastday[2].hour;

    const forecast: HoursOverview[] = [
      todaysHours,
      tomorrowsHours,
      dayAftersHours,
    ].map(removeUnwantedHours);
    setThreeDayWeather(forecast);
  }, [weatherData]);

  return (
    <>
      <Header />
      <Location setWeatherData={setWeatherData} />
      <div className="current-overview">
        {!weatherData || !sunriseTime || !sunsetTime ? (
          <h2>Click the pin or enter your location...</h2>
        ) : (
          <>
            <SunInfo sunData={sunriseTime} />
            <CurrentCondition weatherData={weatherData} />
            <SunInfo sunData={sunsetTime} />
          </>
        )}
      </div>
      {threeDayWeather ? (
        <>
          <DateSelector top={true} dateSelectorProp={dateSelectorProp} />
          <HourlyWeather
            hours={threeDayWeather[chosenIndex]}
            tommorowBG={chosenIndex === 1 ? true : false}
          />
          <DateSelector top={false} dateSelectorProp={dateSelectorProp} />
        </>
      ) : null}
    </>
  );
}

export default App;
