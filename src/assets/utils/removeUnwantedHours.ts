import { HoursOverview } from "../../types/HoursOverview";
import { HourProp } from "../../types/HourProp";
import { format } from "date-fns"

export default function removeUnwantedHours(hours: HoursOverview): HoursOverview {
    const earliestTime: number = 9
    const latestTime: number = 22

    const [hoursDate]: string[] = hours[0].time.split(" ")

    const today: Date = new Date()
    const todayFormattedDate = format(today, "yyyy-MM-dd")
    const currentHour: number = today.getHours()

    const relevantHours: HoursOverview = hours.filter((hour: HourProp) => {
        const epochHour: number = new Date(hour.time_epoch * 1000).getHours()
        const outsideRelevantHours: boolean = epochHour < earliestTime || epochHour > latestTime
        const isToday: boolean = todayFormattedDate === hoursDate

        if ((isToday && currentHour > epochHour) || outsideRelevantHours) return false
        return true
    })
    return relevantHours
}