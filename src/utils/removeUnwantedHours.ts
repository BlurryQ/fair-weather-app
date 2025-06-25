import { format } from "date-fns"

// props
import { HourProp } from "../types/HourProp";
import { CoreSettings } from "../types/settings/CoreSettings";

export default function removeUnwantedHours(hours: HourProp, coreSettings: CoreSettings | number): boolean {
    const earliestTime: number = typeof coreSettings === "number" ? 0 : coreSettings.first_hour
    const latestTime: number = typeof coreSettings === "number" ? 23 : coreSettings.last_hour

    const [hoursDate]: string[] = hours.time.split(" ")

    const today: Date = new Date()
    const todayFormattedDate = format(today, "yyyy-MM-dd")
    const currentHour: number = today.getHours()

    const epochHour: number = new Date(hours.time_epoch * 1000).getHours()
    const outsideRelevantHours: boolean = epochHour < earliestTime || epochHour > latestTime
    const isToday: boolean = todayFormattedDate === hoursDate

    if ((isToday && currentHour > epochHour) || outsideRelevantHours) return false
    return true
}