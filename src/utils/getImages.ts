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
    const rainPercentageTrigger: number = 60
    const snowPercentageTrigger: number = 60
    const tooHotTrigger: number = 17
    const tooColdTrigger: number = 5
    const uvTrigger: number = 3
    const windTrigger: number = 20
    const highWindTrigger: number = 35
    const visibilityTrigger: number = 2
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
    else if (weatherWind >= windTrigger) images.push(windy)

    if (weather.uv > uvTrigger) images.push(lowUV)

    if (weatherVis <= visibilityTrigger) images.push(lowVisability)

    while (images.length < 4) images.push(placeholder)
    while (images.length > 4) images.pop()

    return images
}