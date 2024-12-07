import Forecast from "./Forecast"
import { HourProp } from "../../types/HourProp"
import { HoursOverview } from "../../types/HoursOverview"

export default function TodaysWeather({ todaysHours }: { todaysHours: HoursOverview}): JSX.Element {

    return <div className="todays-weather">
                {
                    todaysHours.map((hour: HourProp) => {
                        return <div key={hour.time_epoch}>
                            <Forecast hour={hour} />
                        </div>
                        })
                }
        </div>
}