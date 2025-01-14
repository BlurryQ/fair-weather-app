import { HourProp } from "../types/HourProp";

export default function getImages(weather: HourProp): string[] {
    const images = []
    if (weather.uv > 3) images.push("./images/burn.png")

    if (weather.will_it_rain || weather.chance_of_rain >= 60) images.push("./images/rain.png")

    if (weather.temp_c > 15) images.push("./images/sunny.png")
    else if (weather.temp_c < 5) images.push("./images/cold.png")
    else images.push("./images/jacket.png")

    if (weather.wind_mph >= 35) images.push("./images/hurricane.png")
    else if (weather.wind_mph >= 20) images.push("./images/windy.png")

    if (images.length < 1) images.push("./images/normal.png")

    return images
}