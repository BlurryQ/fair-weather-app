import Forecast from './Forecast';
import { HourProp } from '../types/HourProp';
import { DisplayNavButtons } from '../types/DisplayNavButtons';

export default function HourlyWeather({
  hours,
  chosenHour,
  setChosenHour,
}: {
  hours: HourProp[];
  chosenHour: number;
  setChosenHour: React.Dispatch<React.SetStateAction<number>>;
}): JSX.Element {
  const placeholder: HourProp = {
    chance_of_rain: 0,
    condition: {
      text: 'unknown',
      icon: '//cdn.weatherapi.com/weather/64x64/day/119.png',
    },
    feelslike_c: 0,
    wind_mph: 0,
    gust_mph: 0,
    temp_c: 0,
    time: '',
    time_epoch: 0,
    uv: 0,
    vis_miles: 0,
    will_it_rain: 0,
  };

  const displayNavButton: DisplayNavButtons = {
    left: chosenHour > 1,
    right: chosenHour < hours.length - 2,
  };

  const arrToUse: HourProp[] = [
    hours[chosenHour - 2] || placeholder,
    hours[chosenHour - 1],
    hours[chosenHour],
    hours[chosenHour + 1],
    hours[chosenHour + 2] || placeholder,
  ];

  return (
    <>
      <div className="weather">
        {arrToUse.map((hour: HourProp, index: number) => {
          return (
            <div key={hour.time_epoch}>
              <Forecast
                hour={hour}
                index={index}
                chosenHour={chosenHour}
                setChosenHour={setChosenHour}
                displayNavButton={displayNavButton}
              />
            </div>
          );
        })}
      </div>
    </>
  );
}
