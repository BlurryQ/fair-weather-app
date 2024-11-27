import { ForecastDay } from "./ForecastDay"

export type WeatherDataProp = {
    forecast: ForecastDay
    location: {
        name: string,
        region: string,
    }
}
