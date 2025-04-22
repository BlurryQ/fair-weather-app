// images
import burntDobe from "../assets/images/weather/burnt.png"
import coldDobe from "../assets/images/weather/cold.png"
import foggyDobe from "../assets/images/weather/foggy.png"
import hurricane from "../assets/images/weather/hurricane.png"
import jacketDobe from "../assets/images/weather/jacket.png"
import rainyDobe from "../assets/images/weather/rainy.png"
import snowyDobe from "../assets/images/weather/snowy.png"
import sunnyDobe from "../assets/images/weather/sunny.png"
import windy from "../assets/images/weather/windy.png"
import placeholder from "/favicon.png"


// props
import { HourProp } from "../types/HourProp";

export default function getImages(weather: HourProp): string[] {
    const rainPercentageTrigger: number = 60
    const snowPercentageTrigger: number = 60
    const tooHotTrigger: number = 18
    const tooColdTrigger: number = 5
    const uvTrigger: number = 3
    const windTrigger: number = 20
    const highWindTrigger: number = 35
    const visibilityTrigger: number = 2
    const weatherTemp: number = weather.temp_c
    const weatherWind: number = weather.wind_mph
    const weatherVis: number = weather.vis_miles
    const images = []
    
    if (weather.will_it_snow || weather.chance_of_snow >= snowPercentageTrigger) images.push(snowyDobe)
        else if (weather.will_it_rain || weather.chance_of_rain >= rainPercentageTrigger) images.push(rainyDobe)
    
    if (weatherTemp > tooHotTrigger) images.push(sunnyDobe)
    else if (weatherTemp < tooColdTrigger) images.push(coldDobe)
    else images.push(jacketDobe)

    if (weather.uv > uvTrigger) images.push(burntDobe)

    if (weatherWind >= highWindTrigger) images.push(hurricane)
    else if (weatherWind >= windTrigger) images.push(windy)

    if (weatherVis <= visibilityTrigger) images.push(foggyDobe)

    while (images.length < 4) images.push(placeholder)

    return images
}