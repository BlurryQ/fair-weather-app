import { HourProp } from "../types/HourProp";

import burntDobe from "/images/burn.png"
import coldDobe from "/images/cold.png"
import hurricane from "/images/hurricane.png"
import jacketDobe from "/images/jacket.png"
import normalDobe from "/images/normal.png"
import rainyDobe from "/images/rain.png"
import sunnyDobe from "/images/sunny.png"
import windy from "/images/windy.png"

export default function getImages(weather: HourProp): string[] {
    const images = []
    if (weather.uv > 3) images.push(burntDobe)

    if (weather.will_it_rain || weather.chance_of_rain >= 60) images.push(rainyDobe)

    if (weather.temp_c > 15) images.push(sunnyDobe)
    else if (weather.temp_c < 5) images.push(coldDobe)
    else images.push(jacketDobe)

    if (weather.wind_mph >= 35) images.push(hurricane)
    else if (weather.wind_mph >= 20) images.push(windy)

    if (images.length < 1) images.push(normalDobe)

    return images
}