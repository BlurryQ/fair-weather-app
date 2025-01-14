import { useEffect, useState } from 'react'
import './App.css'

// react components
import Header from './assets/components/Header'
import SunInfo from './assets/components/SunInfo'
import CurrentCondition from './assets/components/CurrentCondition'

// utils
import removeUnwantedHours from "./assets/utils/removeUnwantedHours"

// types
import { SunInfoProp } from './assets/types/SunInfoProp'
import { WeatherDataProp } from './assets/types/WeatherDataProp'
import Location from './assets/components/Location'
import { HoursOverview } from './assets/types/HoursOverview'
import HourlyWeather from './assets/components/HourlyWeather'

function App() {
  const [sunriseTime, setSunriseTime] = useState<SunInfoProp | null>(null)
  const [sunsetTime, setSunsetTime] = useState<SunInfoProp | null>(null)
  const [weatherData, setWeatherData] = useState<WeatherDataProp | null>(null)

  const [threeDayWeather, setThreeDayWeather] = useState<HoursOverview[] | null>(null)

  useEffect(() => {
    if (!weatherData) return
    const sunrise: SunInfoProp = {
      time: weatherData.forecast.forecastday[0].astro.sunrise,
      type: 'rise',
    }
    const sunset: SunInfoProp = {
      time: weatherData.forecast.forecastday[0].astro.sunset,
      type: 'set',
    }
    setSunriseTime(sunrise)
    setSunsetTime(sunset)

    // tripled
    const todaysHours: HoursOverview | null = weatherData.forecast.forecastday[0].hour
    const tomorrowsHours: HoursOverview | null = weatherData.forecast.forecastday[1].hour
    const dayAftersHours: HoursOverview | null = weatherData.forecast.forecastday[2].hour

    const forecast: HoursOverview[] = [todaysHours, tomorrowsHours, dayAftersHours].map(removeUnwantedHours)
    // console.log(forecast)
    // console.table(forecast)
    setThreeDayWeather(forecast)

  }, [weatherData])

  return (
    <>
      <Header />
      <Location setWeatherData={setWeatherData} />

      <div className="current-overview">
        {!weatherData || !sunriseTime || !sunsetTime
          ? <h2>Click the pin or enter your location...</h2> :
          <>
            <SunInfo sunData={sunriseTime} />
            <CurrentCondition weatherData={weatherData} />
            <SunInfo sunData={sunsetTime} />
          </>
        }
      </div>
  

      {threeDayWeather 
      ? threeDayWeather.map((day: HoursOverview, i: number) => (
          <HourlyWeather key={day[i].time} hours={day} tommorowBG={i === 1 ? true : false}/>
  ))
  : null
}
      
    </>
  )
}

export default App
