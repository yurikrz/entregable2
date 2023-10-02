import React from 'react'

const WeatherStats = ({icon, value, unit}) => {
  return (
    <div className='flex gap-2 items-center justify-between sm:w-full'>
        <img src={icon} alt="" />
        <span>{value}{unit}</span>
  </div>
  )
}

export default WeatherStats
