import { useEffect, useState } from 'react'
import '../../styles/forecast.css'

import { HourProp } from '../types/HourProp'
import getImages from '../utils/getImages'

type Forecast = {
    hour: HourProp | null;
    tommorowBG: boolean;
  };

export default function Forecast({
    hour,
    tommorowBG
}: Forecast): JSX.Element {
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

    const showWeatherDetails = (e: React.MouseEvent<HTMLDivElement>) => {
        const target = e.target as HTMLDivElement;
        const hourID: string = target.dataset.hourId 
            ?? (target.parentNode as HTMLElement | null)?.dataset?.hourId 
            ?? "";
        const weatherCard = document.querySelector(`[data-hour-id="${hourID}"`) as HTMLFormElement

        const tableData: HTMLElement | null = weatherCard.querySelector("#weather-details-desktop")
        const displayLocation: any = weatherCard.querySelector("#weather-details-mobile")
        const carrat: HTMLElement | null = weatherCard.querySelector("#carrat")
        if (!tableData || !displayLocation || !carrat) return


        if (displayLocation.innerHTML) {
            carrat.classList.remove("up")
            carrat.classList.add("down")
            displayLocation.innerHTML = ""
        } else {
            carrat.classList.remove("down")
            carrat.classList.add("up")
            displayLocation.innerHTML = tableData.innerHTML
        }
    }

    const today: Date = new Date(hour.time_epoch * 1000)
    const todaysHours: number = today.getHours()
    const images: string[] = getImages(hour)


    return <div data-hour-id={hour.time_epoch} onClick={showWeatherDetails} className={`forecast ${tommorowBG ? "tommorowBG" : ""}`}>
        <span data-hour-id={hour.time_epoch}>
            <p className='time'>{todaysHours}:00</p>
            {conditionIcon ? <img alt={condition} src={conditionIcon}></img> : null}
        </span>
        <table id='weather-details-desktop'>
                <thead>
                    <tr>
                        <th colSpan={2}>{condition}</th>
                    </tr>
                </thead>
            <tbody>
            <tr>
                <th>Rain:</th>
                <td> {rain ? "Yes" : "No"} ({rainChance}%)</td>
            </tr>
            <tr>
                <th>Temp:</th>
                <td>{temperature}°C ({feelsLike}°C)</td>
            </tr>
            <tr>
                <th>Wind:</th>
                <td>{windSpeed}mph ({gustSpeed}mph)</td>
            </tr>
            <tr>
                <th>Visability:</th>
                <td>{visability} miles</td>
            </tr>
            <tr>
                <th>UV:</th>
                <td>{uvIndex}</td>
            </tr>
            </tbody>
        </table>
        <div data-hour-id={hour.time_epoch} className='weather-images'>
            {images.map(image => {
                const alt = image.split('/')[2]
                return <img key={image} className="dog" src={image} alt={alt} />
            })}
        </div>
        <span id="carrat" className='down'></span>
        <table id='weather-details-mobile'></table>
    </div>
}

