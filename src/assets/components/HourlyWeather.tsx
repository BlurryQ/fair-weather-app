import Forecast from './Forecast';
import { HourProp } from '../types/HourProp';
import { HoursOverview } from '../types/HoursOverview';
import { useState } from 'react';

export default function HourlyWeather({
  hours,
}: {
  hours: HoursOverview;
}): JSX.Element {
  const [chosenIndex, setChosenIndex] = useState<number>(1);
  console.log(hours);

  const arrToUse: HourProp[] = [
    hours[chosenIndex - 1],
    hours[chosenIndex],
    hours[chosenIndex + 1],
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
                chosenIndex={chosenIndex}
                setChosenIndex={setChosenIndex}
              />
            </div>
          );
        })}
      </div>
    </>
  );
}
