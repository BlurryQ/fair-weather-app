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
import { getAllImageUrls } from "../models/supabase/storage/imageStorage"

export default function getImages(weather: HourProp): string[] {
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

    // image urls section
    let imageUrls: ImageUrls[] = settings.imageUrls || [];
    let highUV: string | undefined = highUVDefault
    let lowTemp: string  | undefined = lowTempDefault
    let lowVisability: string  | undefined = lowVisabilityDefault
    let highWind: string  | undefined = highWindDefault
    let highTemp: string  | undefined = highTempDefault
    let rainChance: string  | undefined = rainChanceDefault
    let snowChance: string  | undefined = snowChanceDefault
    let goodDay: string  | undefined = goodDayDefault
    let lowWind: string  | undefined = lowWindDefault

    if (imageUrls.length > 0) {
        
        const now = new Date();
        const oneHour: number = 60 * 60 * 1000;
        const timestampExpired: boolean = now.getTime() - settings.timestamp > oneHour
        
        if (timestampExpired) {
            console.log("Image URLs are outdated, fetching new ones...")
            imageUrls = getAllImageUrls(imageSettings.id);
        }
    
        imageUrls.forEach(imageUrl => {
            if (imageUrl.name === 'high_uv') highUV = imageUrl.url;
            else if (imageUrl.name === 'low_temp') lowTemp = imageUrl.url;
            else if (imageUrl.name === 'low_visability') lowVisability = imageUrl.url;
            else if (imageUrl.name === 'high_wind') highWind = imageUrl.url;
            else if (imageUrl.name === 'high_temp') highTemp = imageUrl.url;
            else if (imageUrl.name === 'rain_chance') rainChance = imageUrl.url;
            else if (imageUrl.name === 'snow_chance') snowChance = imageUrl.url;
            else if (imageUrl.name === 'good_day') goodDay = imageUrl.url;
            else if (imageUrl.name === 'low_wind') lowWind = imageUrl.url;
        });
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
    const images = []
    
    if (weather.will_it_snow || weather.chance_of_snow >= snowPercentageTrigger) images.push(snowChance)
    else if (weather.will_it_rain || weather.chance_of_rain >= rainPercentageTrigger) images.push(rainChance)
    
    if (weatherTemp > highHotTrigger) images.push(goodDay)
    else if (weatherTemp < lowTempTrigger) images.push(lowTemp)
    else images.push(highTemp)

    if (weatherWind >= highWindTrigger) images.push(highWind)
    else if (weatherWind >= lowWindTrigger) images.push(lowWind)

    if (weather.uv > uvTrigger) images.push(highUV)

    if (weatherVis <= visibilityTrigger) images.push(lowVisability)

    while (images.length < 4) images.push(placeholder)
    while (images.length > 4) images.pop()

    return images
}