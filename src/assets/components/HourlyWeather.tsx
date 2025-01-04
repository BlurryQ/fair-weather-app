import Forecast from "./Forecast"
import { HourProp } from "../../types/HourProp"
import { HoursOverview } from "../../types/HoursOverview"

export default function HourlyWeather({ hours }: { hours: HoursOverview}): JSX.Element {

    return <>
            <div className="divide"></div>
            <div className="todays-weather">
                {
                    hours.map((hour: HourProp) => {
                        return <div key={hour.time_epoch}>
                            <Forecast hour={hour} />
                        </div>
                        })
                }
        </div>
        </>
}