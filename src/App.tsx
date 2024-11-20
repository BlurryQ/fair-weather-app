import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'

// react components
import Header from './assets/components/Header'
import SunInfo from './assets/components/SunInfo'
import CurrentCondition from './assets/components/CurrentCondition'

// types
import { SunInfoProp } from './types/SunInfoProp'
import { WeatherDataProp } from './types/WeatherDataProp'
import Location from './assets/components/Location'


function App() {
  const [sunriseTime, setSunriseTime] = useState<SunInfoProp | null>(null)
  const [sunsetTime, setSunsetTime] = useState<SunInfoProp | null>(null)
  const [weatherData, setWeatherData] = useState<WeatherDataProp | null>(null)

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
    </>
  )
}

export default App
