import { format } from "date-fns"

// props
import { HourProp } from "../types/HourProp";
import { CoreSettings } from "../types/settings/CoreSettings";

export default function removeUnwantedHours(hours: HourProp, coreSettings: CoreSettings | number): boolean {
    const earliestTime: number = typeof coreSettings === "number" ? 6 : coreSettings.first_hour
    const latestTime: number = typeof coreSettings === "number" ? 23 : coreSettings.last_hour

    const [hourDate, hoursTime]: string[] = hours.time.split(" ")
    const [time]: string[] = hoursTime.split(":")
    const hourTime: number = Number(time)

    const today: Date = new Date()
    const todayFormattedDate = format(today, "yyyy-MM-dd")
    const currentTime: number = today.getHours()

    const outsideRelevantHours: boolean = hourTime < earliestTime || hourTime > latestTime
    const isToday: boolean = todayFormattedDate === hourDate

    if ((isToday && currentTime > hourTime) || outsideRelevantHours) return false
    return true
}