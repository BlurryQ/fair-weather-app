import { DayOverview } from "./DayOverview"
import { HoursOverview } from "./HoursOverview"

export type DayData = {
    astro: {
        sunrise: string,
        sunset: string,
    },
    day: DayOverview,
    hour: HoursOverview
}
