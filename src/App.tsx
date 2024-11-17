import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'
import Header from './assets/components/header'
import Sunrise from './assets/components/Sunrise'
import Sunset from './assets/components/Sunset'
import CurrentCondition from './assets/components/CurrentCondition'


export type weatherData = {
  text: string,
  icon: string,
}

function App() {
  const [sunriseTime, setSunriseTime] = useState<string>('loading')
  const [sunsetTime, setSunsetTime] = useState<string>('loading')
  const [weatherData, setWeatherData] = useState<weatherData | object>({})

  useEffect(() => {
    const api_key: string = import.meta.env.VITE_API_KEY;
    axios.get(`https://api.weatherapi.com/v1/forecast.json?key=${api_key}&q=BH119FS&days=3&aqi=no&alerts=yes`)
      .then((data) => {
        // console.log(data.data)
        const sunrise: string = data.data.forecast.forecastday[0].astro.sunrise
        const sunset: string = data.data.forecast.forecastday[0].astro.sunset
        setSunriseTime(sunrise)
        setSunsetTime(sunset)
        setWeatherData(data.data.current.condition)
      })
      .catch((err) => {
        console.log('Code:', err.response.data.error.code)
        console.log(err.response.data.error.message)
      })
  }, [])

  return (
    <>
      <Header />
      <Sunrise time={sunriseTime} />
      <CurrentCondition weatherData={weatherData} />
      <Sunset time={sunsetTime} />
    </>
  )
}

export default App
