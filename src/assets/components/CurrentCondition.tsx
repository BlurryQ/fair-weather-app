import { useEffect, useState } from 'react'
import '../../styles/currentConditions.css'

import { weatherData } from '../../types/weatherData'

export default function CurrentCondition({ weatherData }: { weatherData: weatherData | null }): JSX.Element {
    const [condition, setCondition] = useState<string>('')
    const [conditionIcon, setConditionIcon] = useState<string>('')
    const [temperature, setTemperature] = useState<number>(0)
    const [feelsLike, setFeelsLike] = useState<number>(0)
    const [windSpeed, setWindSpeed] = useState<number>(0)
    const [gustSpeed, setgustSpeed] = useState<number>(0)
    const [uvIndex, setUvIndex] = useState<number>(0)
    const [visability, setVisability] = useState<number>(0)

    const getWeatherData = (weatherData: weatherData) => {
        const weather: string = weatherData.condition.text
        const iconData: string = weatherData.condition.icon
        const iconURL: string = iconData.substring(2)
        const temp: number = weatherData.temp_c
        const tempLike: number = weatherData.feelslike_c
        const wind: number = weatherData.wind_mph
        const gust: number = weatherData.gust_mph
        const uv: number = weatherData.uv
        const visability: number = weatherData.vis_miles
        setCondition(weather)
        setConditionIcon(`https://${iconURL}`)
        setTemperature(temp)
        setFeelsLike(tempLike)
        setWindSpeed(wind)
        setgustSpeed(gust)
        setUvIndex(uv)
        setVisability(visability)
    }

    useEffect(() => {
        if (!weatherData) return
        getWeatherData(weatherData)
    }, [weatherData])

    const today = new Date()
    const todaysHours = today.getHours()
    const todaysMinutes = today.getMinutes() < 9 ? "0" + today.getMinutes() : today.getMinutes()

    return <div className="current-conditions">
        <p>{todaysHours}:{todaysMinutes}</p>
        {conditionIcon ? <img alt={condition} src={conditionIcon}></img> : null}
        <ul>
            <li>{condition}</li>
            <li>UV: {uvIndex}</li>
            <li>Temp: {temperature}°C ({feelsLike}°C)</li>
            <li>Wind: {windSpeed}mph ({gustSpeed}mph)</li>
            <li>Visability: {visability} miles</li>
        </ul>
    </div>
}