// components
import Forecast from './Forecast';

// types
import { HourProp } from '../types/HourProp';
import { DisplayNavButtons } from '../types/DisplayNavButtons';

// utils
import filterHoursForScreenSize from '../utils/filterHoursForScreenSize';

export default function HourlyWeatherCard({
  weatherArray,
  chosenHour,
  setChosenHour,
}: {
  weatherArray: HourProp[];
  chosenHour: number;
  setChosenHour: React.Dispatch<React.SetStateAction<number>>;
}): JSX.Element {
  const displayNavButton: DisplayNavButtons = {
    left: chosenHour > 1,
    right: chosenHour < weatherArray.length - 2,
  };

  const hoursToDisplay: HourProp[] = filterHoursForScreenSize(
    weatherArray,
    chosenHour
  );

  return (
    <div className="weather">
      {hoursToDisplay.map((hour: HourProp, index: number) => {
        return (
          <Forecast
            key={hour.time_epoch}
            hour={hour}
            index={index}
            setChosenHour={setChosenHour}
            displayNavButton={displayNavButton}
          />
        );
      })}
    </div>
  );
}
