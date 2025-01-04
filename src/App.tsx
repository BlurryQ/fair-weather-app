import { useEffect, useState } from 'react'
import './App.css'

// react components
import Header from './assets/components/Header'
import SunInfo from './assets/components/SunInfo'
import CurrentCondition from './assets/components/CurrentCondition'

// utils
import removeUnwantedHours from "./assets/utils/removeUnwantedHours"

// types
import { SunInfoProp } from './types/SunInfoProp'
import { WeatherDataProp } from './types/WeatherDataProp'
import Location from './assets/components/Location'
import { HoursOverview } from './types/HoursOverview'
import TodaysWeather from './assets/components/TodaysWeather'

function App() {
  const [sunriseTime, setSunriseTime] = useState<SunInfoProp | null>(null)
  const [sunsetTime, setSunsetTime] = useState<SunInfoProp | null>(null)
  const [weatherData, setWeatherData] = useState<WeatherDataProp | null>(null)
  const [todaysHours, setTodaysHours] = useState<HoursOverview | null>(null)
  const [tomorrowsHours, setTomorrowsHours] = useState<HoursOverview | null>(null)
  const [dayAftersHours, setDayAftersHours] = useState<HoursOverview | null>(null)

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

    const todaysHours: HoursOverview | null = weatherData.forecast.forecastday[0].hour
    const tomorrowsHours: HoursOverview | null = weatherData.forecast.forecastday[1].hour
    const dayAftersHours: HoursOverview | null = weatherData.forecast.forecastday[1].hour
    setTodaysHours(removeUnwantedHours(todaysHours))
    setTomorrowsHours(removeUnwantedHours(tomorrowsHours))
    setDayAftersHours(removeUnwantedHours(dayAftersHours))

  }, [weatherData])

  return (
    <>
      <Header />
      <Location setWeatherData={setWeatherData} />

      <div className="current-overview">
        {!weatherData || !sunriseTime || !sunsetTime
          ? <h2>Please enter your location...</h2> :
          <>
            <SunInfo sunData={sunriseTime} />
            <CurrentCondition weatherData={weatherData} />
            <SunInfo sunData={sunsetTime} />
          </>
        }
      </div>

      {Array.isArray(todaysHours) 
      ? <TodaysWeather hours={todaysHours} />
      : null}

      {Array.isArray(tomorrowsHours) 
      ? <TodaysWeather hours={tomorrowsHours} />
      : null}

      {Array.isArray(dayAftersHours) 
      ? <TodaysWeather hours={dayAftersHours} />
      : null}
      
    </>
  )
}

export default App
