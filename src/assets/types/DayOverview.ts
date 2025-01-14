export type DayOverview = {
    avgtemp_c: number,
    avgvis_miles: number,
    condition: {
        icon: string,
        text: string,
    },
    daily_chance_of_rain: number,
    daily_will_it_rain: number,
    maxtemp_c: number,
    mintemp_c: number,
    maxwind_mph: number,
    uv: number,
}