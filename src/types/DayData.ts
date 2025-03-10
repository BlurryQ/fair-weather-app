import { DayOverview } from "./DayOverview"
import { HourProp } from "./HourProp"

export type DayData = {
    astro: {
        sunrise: string,
        sunset: string,
    },
    day: DayOverview,
    hour: HourProp[]
}
