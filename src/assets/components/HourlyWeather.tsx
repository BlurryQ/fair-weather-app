import Forecast from './Forecast';
import { HourProp } from '../types/HourProp';
import { HoursOverview } from '../types/HoursOverview';
import { useState } from 'react';

export default function HourlyWeather({
  hours,
}: {
  hours: HoursOverview;
}): JSX.Element {
  const [selectedIndex, setSelectedIndex] = useState<number>(1);
  return (
    <>
      <div className="weather">
        {hours.map((hour: HourProp, index: number) => {
          return (
            <div data-weather-card={hour.time_epoch} key={hour.time_epoch}>
              <Forecast
                hour={hour}
                index={index}
                selectedIndex={selectedIndex}
                setSelectedIndex={setSelectedIndex}
              />
            </div>
          );
        })}
      </div>
    </>
  );
}
