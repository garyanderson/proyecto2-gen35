import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'
import WeatherCard from './components/WeatherCard'
import Loader from './components/Loader.jsx'
import NoLocation from './components/NoLocation.jsx'

function App() {

  const [coords, setCoords] = useState()
  const [weather, setWeather] = useState()
  const [temp, setTemp] = useState()
  const [isLoading, setIsLoading] = useState(true)
  const [rejectMap, setRejectMap] = useState(false)
  const [OthersWeathers, setOthersWeathers] = useState()

  const success = info => {
    setCoords({
      lat: info.coords.latitude,
      lon:  info.coords.longitude
    })
  }

  const error = () => {
    setRejectMap(true)
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success, error)
  }, [])
  
  

  useEffect( () => {
    if(coords) {
      const APIKEY = '2061e2b55e1640bfd3e0e88257011319'
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&appid=${APIKEY}`
      axios.get(url)
        .then(res => {         
           setWeather(res.data)
           console.log(res.data)
          const celsius = (res.data.main.temp - 273.15).toFixed(1)
          const farenheit = ((9/5 * celsius) + 32).toFixed(1)        
          setTemp({
            celsius,
            farenheit
          })
        })
        .catch(err => console.log(err))
        .finally(() => setIsLoading(false))
    }  
  }, [coords] )

  return (
    <div className='app'>

        

      {
        rejectMap
        ? <NoLocation />
        :
        isLoading
        ?  <Loader />
        : (
          <WeatherCard 
          weather={weather}
          temp={temp}
          />
        )
      }
    </div>

  )
}

export default App