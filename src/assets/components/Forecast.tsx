import { useEffect, useState } from 'react'
import '../../styles/forecast.css'

import { HourProp } from '../../types/HourProp'
import getImages from '../utils/getImages'

export default function Forecast({ hour }: { hour: HourProp | null }): JSX.Element {
    if (!hour) return <></>
    const [condition, setCondition] = useState<string>('')
    const [conditionIcon, setConditionIcon] = useState<string>('')
    const [rain, setRain] = useState<number>(0)
    const [rainChance, setRainChance] = useState<number>(0)
    const [temperature, setTemperature] = useState<number>(0)
    const [feelsLike, setFeelsLike] = useState<number>(0)
    const [windSpeed, setWindSpeed] = useState<number>(0)
    const [gustSpeed, setgustSpeed] = useState<number>(0)
    const [uvIndex, setUvIndex] = useState<number>(0)
    const [visability, setVisability] = useState<number>(0)

    const setWeatherData = (hour: HourProp) => {
        const weather: string = hour.condition.text
        const iconData: string = hour.condition.icon
        const iconURL: string = iconData.substring(2)
        const temp: number = hour.temp_c
        const tempLike: number = hour.feelslike_c
        const wind: number = hour.wind_mph
        const rainChance: number = hour.chance_of_rain
        const rain: number = hour.will_it_rain
        const gust: number = hour.gust_mph
        const uv: number = hour.uv
        const visability: number = hour.vis_miles
        setCondition(weather)
        setConditionIcon(`https://${iconURL}`)
        setRain(rain)
        setRainChance(rainChance)
        setTemperature(temp)
        setFeelsLike(tempLike)
        setWindSpeed(wind)
        setgustSpeed(gust)
        setUvIndex(uv)
        setVisability(visability)
    }

    useEffect(() => {
        if (!hour) return
        setWeatherData(hour)
    }, [hour])

    const today: Date = new Date(hour.time_epoch * 1000)
    const todaysHours: number = today.getHours()
    const images: string[] = getImages(hour)


    return <ul className='forecast'>
        <li className='time'>{todaysHours}:00</li>
        <li>UV: {uvIndex}</li>
        {conditionIcon ? <img alt={condition} src={conditionIcon}></img> : null}
        <li>{condition}</li>
        <li>Rain: {rain ? "Yes" : "No"} ({rainChance}%)</li>
        <li>Temp: {temperature}°C ({feelsLike}°C)</li>
        <li>Wind: {windSpeed}mph ({gustSpeed}mph)</li>
        <li>Visability: {visability} miles</li>
        <div className='weather-images'>
            {images.map(image => {
                const alt = image.split('/')[2]
                return <img key={image} className="dog" src={image} alt={alt} />
            })}
        </div>

    </ul>
}

