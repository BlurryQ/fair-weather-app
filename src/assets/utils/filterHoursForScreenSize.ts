import { HourProp } from "../types/HourProp";

export default function filterHoursForScreenSize(
    hours: HourProp[],
    chosenHour: number
): HourProp[] {

    const placeholder: HourProp = {
    chance_of_rain: 0,
    condition: {
        text: 'unknown',
        icon: '//cdn.weatherapi.com/weather/64x64/day/119.png',
    },
    feelslike_c: 0,
    wind_mph: 0,
    gust_mph: 0,
    temp_c: 0,
    time: '',
    time_epoch: 0,
    uv: 0,
    vis_miles: 0,
    will_it_rain: 0,
    placeholder: true,
    };

    let arrToUse: HourProp[] | null = null
    let windowSize: number = window.innerWidth

    if (windowSize <= 767)
        arrToUse = hours
    else
        arrToUse = [
            hours[chosenHour - 2] || placeholder,
            hours[chosenHour - 1] || placeholder,
            hours[chosenHour] || placeholder,
            hours[chosenHour + 1] || placeholder,
            hours[chosenHour + 2] || placeholder,
        ];

    return arrToUse
}