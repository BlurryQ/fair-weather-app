export type HourProp = {
    chance_of_rain: number,
    condition: {
        text: string,
        icon: string,
    },
    feelslike_c: number,
    wind_mph: number,
    gust_mph: number,
    temp_c: number,
    time_epoch: number,
    uv: number,
    vis_miles: number,
    will_it_rain: number,
}
