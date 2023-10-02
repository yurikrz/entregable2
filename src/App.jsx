
import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'
import WeatherContainer from './components/WeatherContainer.jsx'
import WeatherIcons from './utilis/WeatherIcons.js'
import Loader from './components/Loader.jsx'

function App() {
  const [weather, setWeather] = useState(null)
  const [weatherIcon, setWeatherIcon] = useState(null)
  const [weatherBg, setWeatherBg] = useState(null)
  const [showLoader, setShowLoader] = useState(true)
  const apiKey = "4777b5d3f0976a6ac57eed4499a5724b"

  const success = (pos) =>{
    const lat = pos.coords.latitude
    const lon = pos.coords.longitude

    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`)
      .then(({data}) => {
        setWeather(data)
        updateIconBg(data)
        setShowLoader(false)
      })
      .catch(err => console.log(err))
  }

  const searchWeatherbyCity = async (value) =>{
    // try{
    //   const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${value}&appid=${apiKey}`)
    //   const data = await response.json()
      
    //   if (response.status !== 200) {
    //     throw data
    //   }
      
    //   setWeather(data)
    //   updateIconBg(data)
    //   return data
    // } catch (err) {
    //   throw err
    // }
    
    try{
      const result = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${value}&appid=${apiKey}`)
      if (result.status !== 200) {
        throw result.data
      }
      setWeather(result.data)
      updateIconBg(result.data)
      
    } catch (err) {
      throw err
    }
  }

  const updateIconBg = (data) =>{
    const Icon = WeatherIcons.find((weatherIcon) => weatherIcon.id === data?.weather[0].icon.toLowerCase().slice(0,2))
    const isDay = data?.dt >= data?.sys.sunrise && data?.dt < data?.sys.sunset

    setWeatherIcon(Icon[isDay ? "dayIcon" : "nightIcon"])
    setWeatherBg(Icon.background)
  }

  // useEffect(()=>{
  //   updateIconBg()
  // },[weather])

  useEffect(()=>{
    navigator.geolocation.getCurrentPosition(success)
  },[])

  return (
    // 
    <main className={`font-[Lato] flex justify-center items-center min-h-screen text-black px-2 py-4 bg-[url('${weatherBg}')] bg-cover bg-no-repeat`}>
      {
        showLoader && <Loader /> 
      }
      {
       weather === null ? <h3>"Cargando"</h3> : <WeatherContainer weather={weather} weatherIcon={weatherIcon} searchWeatherbyCity={searchWeatherbyCity}/>
      }
      
    </main>
  )
}

export default App