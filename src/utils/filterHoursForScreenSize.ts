import { HourProp } from "../types/HourProp";

export default function filterHoursForScreenSize(
    hours: HourProp[],
    chosenHour: number
): HourProp[] {
    // return hours based on screen size, eg carousel or cards
    let windowSize: number = window.innerWidth
    if (windowSize <= 767)
        return hours

    const firstHour: HourProp = hours[chosenHour - 1]
    const selectedHour: HourProp = hours[chosenHour]
    const nextHour: HourProp = hours[chosenHour + 1]

    const createPlaceholder = (hour: HourProp, offset: number): HourProp => {
        return { ...hour, time_epoch: hour.time_epoch + offset, placeholder: true }
    }

    if (hours.length === 1) {
        return [
            createPlaceholder(firstHour, 1),
            createPlaceholder(firstHour, 2),
            firstHour,
            createPlaceholder(firstHour, 3),
            createPlaceholder(firstHour, 4),
        ];
    }

    if (hours.length === 2) {
        return [
            createPlaceholder(firstHour, 1),
            createPlaceholder(firstHour, 2),
            firstHour,
            selectedHour,
            createPlaceholder(selectedHour, 1),
        ];
    }

    return [
        hours[chosenHour - 2] || { ...firstHour, time_epoch: firstHour.time_epoch + 1 },
        firstHour,
        selectedHour,
        nextHour,
        hours[chosenHour + 2] || { ...nextHour, time_epoch: nextHour.time_epoch + 1 },
    ]
}


