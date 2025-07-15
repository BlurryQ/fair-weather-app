// images
import lowUV from "../assets/images/weather/lowUV.png"
import cold from "../assets/images/weather/cold.png"
import lowVisability from "../assets/images/weather/lowVisability.png"
import highWind from "../assets/images/weather/highWind.png"
import mild from "../assets/images/weather/mild.png"
import rainy from "../assets/images/weather/rainy.png"
import snowy from "../assets/images/weather/snowy.png"
import sunny from "../assets/images/weather/sunny.png"
import windy from "../assets/images/weather/windy.png"
import placeholder from "/favicon.png"


// props
import { HourProp } from "../types/HourProp";

export default function getImages(weather: HourProp): string[] {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const imageSettings = user.settings?.imageSettings || {};
    
    const rainPercentageTrigger: number = imageSettings.rain_chance || 60
    const snowPercentageTrigger: number = imageSettings.snow_chance || 60
    const tooHotTrigger: number = imageSettings.high_temp || 17
    const tooColdTrigger: number = imageSettings.low_temp || 5
    const uvTrigger: number = imageSettings.high_uv || 3
    const lowWindTrigger: number = imageSettings.low_wind || 20
    const highWindTrigger: number = imageSettings.high_wind|| 35
    const visibilityTrigger: number = imageSettings.low_visability || 2

    // TODO make these settings dynamic
    const weatherTemp: number = weather.temp_c
    const weatherWind: number = weather.wind_mph
    const weatherVis: number = weather.vis_miles
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