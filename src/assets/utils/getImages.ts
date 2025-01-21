import { HourProp } from "../types/HourProp";

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

export default function getImages(weather: HourProp): string[] {
    const images = []
    
    if (weather.condition.text.includes("snow")) images.push(snowyDobe)
        else if (weather.will_it_rain || weather.chance_of_rain >= 60) images.push(rainyDobe)
    
    if (weather.temp_c > 18) images.push(sunnyDobe)
    else if (weather.temp_c < 5) images.push(coldDobe)
    else images.push(jacketDobe)

    if (weather.uv > 3) images.push(burntDobe)

    if (weather.wind_mph >= 35) images.push(hurricane)
    else if (weather.wind_mph >= 20) images.push(windy)

    if (weather.vis_miles <= 2) images.push(foggyDobe)

    while (images.length < 4) images.push(placeholder)

    return images
}