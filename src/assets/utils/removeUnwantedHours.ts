import { HoursOverview } from "../../types/HoursOverview";
import { HourProp } from "../../types/HourProp";

export default function removeUnwantedHours(todaysHours : HoursOverview): HoursOverview {
    const relevantHours: HoursOverview =  todaysHours.filter((hour: HourProp) => {
        const today: Date = new Date()
        const currentHour: number = today.getHours()
        const epochDate: Date = new Date(hour.time_epoch * 1000)
        const epochHour: number = epochDate.getHours()
        if (currentHour > epochHour || epochHour < 9 || epochHour > 22) return false
        return true
    })
    return relevantHours
}