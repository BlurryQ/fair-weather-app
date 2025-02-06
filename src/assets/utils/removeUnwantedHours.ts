import { format } from "date-fns"

// props
import { HourProp } from "../types/HourProp";

export default function removeUnwantedHours(hours: HourProp): boolean {

// console.log(hours)
    const earliestTime: number = 9
    const latestTime: number = 22

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