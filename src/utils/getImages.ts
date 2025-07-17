// images
import lowUV from "../assets/images/weather/high_uv.png"
import cold from "../assets/images/weather/low_temp.png"
import lowVisability from "../assets/images/weather/low_visability.png"
import highWind from "../assets/images/weather/high_wind.png"
import mild from "../assets/images/weather/high_temp.png"
import rainy from "../assets/images/weather/rain_chance.png"
import snowy from "../assets/images/weather/snow_chance.png"
import sunny from "../assets/images/weather/good_day.png"
import windy from "../assets/images/weather/low_wind.png"
import placeholder from "/favicon.png"

// props
import { HourProp } from "../types/HourProp";
import { ImageSettings } from "../types/settings/ImageSettings"
import { CoreSettings } from "../types/settings/CoreSettings"

export default function getImages(weather: HourProp): string[] {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const settings = user.settings || {};
    const imageSettings: ImageSettings = settings.image_settings || {};
    
    const rainPercentageTrigger: number = imageSettings.rain_chance || 60
    const snowPercentageTrigger: number = imageSettings.snow_chance || 60
    const tooHotTrigger: number = imageSettings.high_temp || 17
    const tooColdTrigger: number = imageSettings.low_temp || 5
    const uvTrigger: number = imageSettings.high_uv || 3
    const lowWindTrigger: number = imageSettings.low_wind || 20
    const highWindTrigger: number = imageSettings.high_wind|| 35
    const visibilityTrigger: number = imageSettings.low_visability || 2
    
    // TODO make these settings dynamic
    const coreSettings: CoreSettings = settings.core_settings || {};
    const weatherTemp: number = coreSettings.is_celsius ? weather.temp_c : weather.temp_f
    const weatherWind: number = coreSettings.is_miles? weather.wind_mph : weather.wind_kph
    const weatherVis: number = coreSettings.is_miles? weather.vis_miles : weather.vis_km
    const images = []
    
    if (weather.will_it_snow || weather.chance_of_snow >= snowPercentageTrigger) images.push(snowy)
    else if (weather.will_it_rain || weather.chance_of_rain >= rainPercentageTrigger) images.push(rainy)
    
    if (weatherTemp > tooHotTrigger) images.push(sunny)
    else if (weatherTemp < tooColdTrigger) images.push(cold)
    else images.push(mild)

    if (weatherWind >= highWindTrigger) images.push(highWind)
    else if (weatherWind >= lowWindTrigger) images.push(windy)

    if (weather.uv > uvTrigger) images.push(lowUV)

    if (weatherVis <= visibilityTrigger) images.push(lowVisability)

    while (images.length < 4) images.push(placeholder)
    while (images.length > 4) images.pop()

    return images
}