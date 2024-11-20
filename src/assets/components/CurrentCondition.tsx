import { useEffect, useState } from 'react'
import '../../styles/currentConditions.css'

import { WeatherDataProp } from '../../types/WeatherDataProp'

export default function CurrentCondition({ weatherData }: { weatherData: WeatherDataProp | null }): JSX.Element {
    const [condition, setCondition] = useState<string>('')
    const [conditionIcon, setConditionIcon] = useState<string>('')
    const [temperature, setTemperature] = useState<number>(0)
    const [feelsLike, setFeelsLike] = useState<number>(0)
    const [windSpeed, setWindSpeed] = useState<number>(0)
    const [gustSpeed, setgustSpeed] = useState<number>(0)
    const [uvIndex, setUvIndex] = useState<number>(0)
    const [visability, setVisability] = useState<number>(0)

    const setWeatherData = (weatherData: WeatherDataProp) => {
        const weather: string = weatherData.current.condition.text
        const iconData: string = weatherData.current.condition.icon
        const iconURL: string = iconData.substring(2)
        const temp: number = weatherData.current.temp_c
        const tempLike: number = weatherData.current.feelslike_c
        const wind: number = weatherData.current.wind_mph
        const gust: number = weatherData.current.gust_mph
        const uv: number = weatherData.current.uv
        const visability: number = weatherData.current.vis_miles
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
        setWeatherData(weatherData)
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