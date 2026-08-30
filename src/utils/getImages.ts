// images
import highUVDefault from "../assets/images/weather/high_uv.png"
import lowTempDefault from "../assets/images/weather/low_temp.png"
import lowVisabilityDefault from "../assets/images/weather/low_visability.png"
import highWindDefault from "../assets/images/weather/high_wind.png"
import highTempDefault from "../assets/images/weather/high_temp.png"
import rainChanceDefault from "../assets/images/weather/rain_chance.png"
import snowChanceDefault from "../assets/images/weather/snow_chance.png"
import goodDayDefault from "../assets/images/weather/good_day.png"
import lowWindDefault from "../assets/images/weather/low_wind.png"
import placeholder from "/favicon.png"

// props
import { HourProp } from "../types/HourProp";
import { ImageSettings } from "../types/settings/ImageSettings"
import { CoreSettings } from "../types/settings/CoreSettings"
import { ImageUrls } from "../types/settings/ImageUrls"

// Bundled fallback for every slot name. A user's uploaded image can fail to load
// (e.g. an object URL left over from a dead session); DogGrid swaps back to these
// on an <img> error so the grid never shows a broken image.
export const IMAGE_DEFAULTS: Record<string, string> = {
    high_uv: highUVDefault,
    low_temp: lowTempDefault,
    low_visability: lowVisabilityDefault,
    high_wind: highWindDefault,
    high_temp: highTempDefault,
    rain_chance: rainChanceDefault,
    snow_chance: snowChanceDefault,
    good_day: goodDayDefault,
    low_wind: lowWindDefault,
    favicon: placeholder,
}

export type WeatherImage = { src: string; name: string }

export default function getImages(weather: HourProp): WeatherImage[] {
    // determine which images to show based on user and weather settings
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const settings = user.settings || {};

    // image settings section
    const imageSettings: ImageSettings = settings.imageSettings || {};
    const rainPercentageTrigger: number = imageSettings.rain_chance || 60
    const snowPercentageTrigger: number = imageSettings.snow_chance || 60
    const highHotTrigger: number = imageSettings.high_temp || 17
    const lowTempTrigger: number = imageSettings.low_temp || 5
    const uvTrigger: number = imageSettings.high_uv || 3
    const lowWindTrigger: number = imageSettings.low_wind || 20
    const highWindTrigger: number = imageSettings.high_wind|| 35
    const visibilityTrigger: number = imageSettings.low_visability || 2

    // image urls section - start from the bundled default, use the user's upload
    // if they have one for that slot
    const imageUrls: ImageUrls[] = settings.imageUrls || [];
    const url = (name: string): string => {
        const custom = imageUrls.find((entry: ImageUrls) => entry.name === name)
        return custom?.url || IMAGE_DEFAULTS[name]
    }

    // core settings section
    const coreSettings: CoreSettings = settings.coreSettings || null;
    let weatherTemp: number = weather.temp_c
    let weatherWind: number = weather.wind_mph
    let weatherVis: number = weather.vis_miles
    if (coreSettings) {
        weatherTemp = coreSettings.is_celsius ? weather.temp_c : weather.temp_f
        weatherWind = coreSettings.is_miles? weather.wind_mph : weather.wind_kph
        weatherVis = coreSettings.is_miles? weather.vis_miles : weather.vis_km
    }

    const images: WeatherImage[] = []
    const add = (name: string) => images.push({ src: url(name), name })

    if (weather.will_it_snow || weather.chance_of_snow >= snowPercentageTrigger) add('snow_chance')
    else if (weather.will_it_rain || weather.chance_of_rain >= rainPercentageTrigger) add('rain_chance')

    if (weatherTemp > highHotTrigger) add('good_day')
    else if (weatherTemp < lowTempTrigger) add('low_temp')
    else add('high_temp')

    if (weatherWind >= highWindTrigger) add('high_wind')
    else if (weatherWind >= lowWindTrigger) add('low_wind')

    if (weather.uv > uvTrigger) add('high_uv')

    if (weatherVis <= visibilityTrigger) add('low_visability')

    while (images.length < 4) images.push({ src: placeholder, name: 'favicon' })
    while (images.length > 4) images.pop()

    return images
}
