
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
  const [theme, setTheme] = useState("light")
  const apiKey = "4777b5d3f0976a6ac57eed4499a5724b"

  const success = (pos) =>{
    const lat = pos.coords.latitude
    const lon = pos.coords.longitude

    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`)
      .then(({data}) => {
        setWeather(data)
        updateIconBg(data)
        waitShowLoader(false)
      })
      .catch(err => console.log(err))
  }

  const searchWeatherbyCity = async (value) =>{
    try{
      setShowLoader(true)
      const result = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${value}&appid=${apiKey}`)
      
      if (result.status !== 200) {
        waitShowLoader(false)
        throw result.data
      }
      setWeather(result.data)
      updateIconBg(result.data)
      waitShowLoader(false)
    } catch (err) {
      waitShowLoader(false)
      throw err
    }
  }

  const waitShowLoader = (status)=>{
    setTimeout(()=>{
      setShowLoader(status)
    },500)
  }
  
  const updateIconBg = (data) =>{
    const Icon = WeatherIcons.find((weatherIcon) => weatherIcon.id === data?.weather[0].icon.toLowerCase().slice(0,2))
    const isDay = data?.dt >= data?.sys.sunrise && data?.dt < data?.sys.sunset

    setWeatherIcon(Icon[isDay ? "dayIcon" : "nightIcon"])
    setWeatherBg(Icon.background)
  }

  useEffect(()=>{
    navigator.geolocation.getCurrentPosition(success)
  },[])

  return (
    <main className="font-[Lato] flex justify-center items-center min-h-screen text-black px-2 py-4 dark:text-white" style={{backgroundImage: `url("${weatherBg}")`, backgroundSize: "cover", backgroundRepeat: "no-repeat"}}>
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
