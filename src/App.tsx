import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'

function App() {
  const [currentWeather, setCurrentWeather] = useState<string>('')
  const [currentWeatherIcon, setCurrentWeatherIcon] = useState<string>('')

  useEffect(() => {
    const api_key = import.meta.env.VITE_API_KEY;
    axios.get(`https://api.weatherapi.com/v1/forecast.json?key=${api_key}&q=BH119FS&days=3&aqi=no&alerts=yes`)
      .then((data) => {
        // console.log(data.status)
        // console.log(data.data)
        const weather: string = data.data.current.condition.text
        const iconData: string = data.data.current.condition.icon
        const iconURL: string = iconData.split("").slice(2,).join("")
        setCurrentWeather(weather)
        setCurrentWeatherIcon(`https://${iconURL}`)
      })
      .catch((err) => {
        console.log('Code:', err.response.data.error.code)
        console.log(err.response.data.error.message)
      })
  }, [])

  return (
    <>
      <h1>Fair Weather App</h1>
      {currentWeatherIcon ? <img src={currentWeatherIcon}></img> : null}
      <p>{currentWeather}</p>
    </>
  )
}

export default App
