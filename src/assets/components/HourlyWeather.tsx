import Forecast from "./Forecast"
import { HourProp } from "../../types/HourProp"
import { HoursOverview } from "../../types/HoursOverview"

export default function HourlyWeather({ hours }: { hours: HoursOverview}, {greyBG} : {greyBG: boolean}): JSX.Element {

    // TODO add greyBG to CSS and enabked beneath
    return <>
            <div className="divide"></div>
            <div className="weather ">
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