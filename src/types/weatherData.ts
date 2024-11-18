export type weatherData = {
    condition: {
        text: string,
        icon: string,
    }
    temp_c: number,
    feelslike_c: number,
    wind_mph: number,
    gust_mph: number,
    uv: number,
    vis_miles: number,
}