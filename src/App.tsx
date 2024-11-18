import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'

// react components
import Header from './assets/components/Header'
import SunInfo from './assets/components/SunInfo'
import CurrentCondition from './assets/components/CurrentCondition'

// types
import { sunInfo } from './types/sunInfo'
import { weatherData } from './weatherData'


function App() {
  const [sunriseTime, setSunriseTime] = useState<sunInfo | null>(null)
  const [sunsetTime, setSunsetTime] = useState<sunInfo | null>(null)
  const [weatherData, setWeatherData] = useState<weatherData | null>(null)

  useEffect(() => {
    const api_key: string = import.meta.env.VITE_API_KEY;
    axios.get(`https://api.weatherapi.com/v1/forecast.json?key=${api_key}&q=BH119FS&days=3&aqi=no&alerts=yes`)
      .then((data) => {
        // console.log(data.data)
        const sunrise: sunInfo = {
          time: data.data.forecast.forecastday[0].astro.sunrise,
          type: 'rise',
        }
        const sunset: sunInfo = {
          time: data.data.forecast.forecastday[0].astro.sunset,
          type: 'set',
        }
        setSunriseTime(sunrise)
        setSunsetTime(sunset)
        setWeatherData(data.data.current)
      })
      .catch((err) => {
        console.log('Code:', err.response.data.error.code)
        console.log(err.response.data.error.message)
      })
  }, [])

  return (
    <>
      <Header />
      <div className="current-overview">
        {!weatherData || !sunriseTime || !sunsetTime
          ? <h2>LOADING...</h2> :
          <>
            <SunInfo data={sunriseTime} />
            <CurrentCondition weatherData={weatherData} />
            <SunInfo data={sunsetTime} />
          </>
        }
      </div>
    </>
  )
}

export default App
