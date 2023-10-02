import React, { useState } from 'react'
import WeatherStats from './WeatherStats'


const WeatherContainer = ({weather, weatherIcon,searchWeatherbyCity}) => {
  const [isCelsius, setIsCelsius] = useState(true)
  const date = new Date(weather.dt * 1000)
  const [error, setError] = useState("")

  const changeUnitTemp = (temp) =>{
    if (isCelsius){
      return ((temp - 273.15).toFixed(1)+" °C")
    } else {
      return (((temp - 273.15)* (9/5) + 32).toFixed(1)+" °F")
    }
  }

  const handleChangeUnit = () =>{
    setIsCelsius(!isCelsius)
  }

  const handleKeyDown = async (event) =>{
    if (event.key === 'Enter') {
      event.preventDefault()
      event.stopPropagation()
      try {
        await searchWeatherbyCity(event.target.value)
        event.target.value=""
        setError('')
      }catch (err){
        setError(err.response.data.message)
      }
    }
  } 

  return (
    <section className='text-center grid gap-5 items-center justify-items-center'>
        <form className="w-full" action="">
          <input type="search" className="input" placeholder='Buscar una ciudad' onKeyDown={handleKeyDown}/>
        </form>
        <span className='text-red-700'>{error}</span>

        <h3 className='text-xl font-semibold [text-shadow:_0px_4px_4px_rgba(255,255,255,0.25)]'>{weather.name}, {weather.sys.country}</h3>
        <div className='grid gap-5 sm:grid-cols-[1fr_auto]'>
            {/* Seccion superior */}
            <article className='bg-[rgba(224,224,224,0.50)] rounded-3xl grid grid-cols-2 p-3 items-center justify-items-center min-w-[348px] min-h-[216px]'>
              <h4 className='col-span-2 text-lg capitalize'>{weather.weather[0].description}</h4>
              <span className='text-5xl'>{changeUnitTemp(weather.main.temp)}</span>
              <img src={weatherIcon} alt="" />
            </article>

            {/* Seccion inferior */}
            <article className='grid grid-cols-[1fr_2px_1fr_2px_1fr] justify-items-center items-center bg-[rgba(224,224,224,0.50)] rounded-3xl p-2 py-3 sm:grid-cols-1 sm:grid-rows-[1fr_auto_1fr_auto_1fr]'>
             <WeatherStats icon="/wind.svg" unit="m/s" value={weather.wind.speed}/>
             <div className="h-full w-full border-r-2 border-[rgba(0,0,0,0.23)] sm:border-r-0 sm:border-b-2"></div>
             <WeatherStats icon="/humidity.svg" unit="%" value={weather.main.humidity}/>
             <div className="h-full w-full border-r-2 border-[rgba(0,0,0,0.23)] sm:border-r-0 sm:border-b-2"></div>
             <WeatherStats icon="/pressure.svg" unit="hPa" value={weather.main.pressure}/>
            </article>
        </div>
        <button className="rounded-2xl bg-white shadow-md text-[#4580BA] w-[151.86px] h-[34px] mt-5 hover:bg-[#4580BA] hover:text-white" onClick={handleChangeUnit}>{`Cambiar a ${isCelsius ? "F°" : "C°"}`}</button>
    </section>
  )
}

export default WeatherContainer
