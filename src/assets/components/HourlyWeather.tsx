import Forecast from "./Forecast";
import { HourProp } from "../types/HourProp";
import { HoursOverview } from "../types/HoursOverview";

type HourlyWeatherProps = {
  hours: HoursOverview;
  tommorowBG: boolean;
};

export default function HourlyWeather({
  hours,
  tommorowBG,
}: HourlyWeatherProps): JSX.Element {
  return (
    <>
      <div className="weather">
        {hours.map((hour: HourProp) => {
          return (
            <div key={hour.time_epoch}>
              <Forecast hour={hour} tommorowBG={tommorowBG} />
            </div>
          );
        })}
      </div>
    </>
  );
}
