// images
import burntDobe from "/images/burnt.png"
import coldDobe from "/images/cold.png"
import foggyDobe from "/images/foggy.png"
import hurricane from "/images/hurricane.png"
import jacketDobe from "/images/jacket.png"
import rainyDobe from "/images/rainy.png"
import snowyDobe from "/images/snowy.png"
import sunnyDobe from "/images/sunny.png"
import windy from "/images/windy.png"
import placeholder from "/favicon.png"


// props
import { HourProp } from "../types/HourProp";

export default function getImages(weather: HourProp): string[] {
    const rainPercentageTrigger: number = 60
    const tooHotTrigger: number = 18
    const tooColdTrigger: number = 5
    const uvTrigger: number = 3
    const highWindTrigger: number = 35
    const windTrigger: number = 20
    const visibilityTrigger: number = 2
    const images = []
    
    if (weather.condition.text.includes("snow")) images.push(snowyDobe)
        else if (weather.will_it_rain || weather.chance_of_rain >= rainPercentageTrigger) images.push(rainyDobe)
    
    if (weather.temp_c > tooHotTrigger) images.push(sunnyDobe)
    else if (weather.temp_c < tooColdTrigger) images.push(coldDobe)
    else images.push(jacketDobe)

    if (weather.uv > uvTrigger) images.push(burntDobe)

    if (weather.wind_mph >= highWindTrigger) images.push(hurricane)
    else if (weather.wind_mph >= windTrigger) images.push(windy)

    if (weather.vis_miles <= visibilityTrigger) images.push(foggyDobe)

    while (images.length < 4) images.push(placeholder)

    return images
}