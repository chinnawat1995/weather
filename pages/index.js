import Head from 'next/head'
import { useCallback, useState } from 'react'
import axios from 'axios'
import dayjs from 'dayjs'
import { debounce } from 'lodash'
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { Pagination } from 'swiper'
import InputSearch from '@/components/search-country/InputSearch'
import DetailWeatherItem from '@/components/detail-weather/DetailWeatherItem'
import WeatherDailyItem from '@/components/weather-daily/WeatherDailyItem'

import 'swiper/css'
import 'swiper/css/pagination'

SwiperCore.use([Pagination])

const weather = ['thunderstorm', 'drizzle', 'rain', 'snow', 'clouds', 'clear']

const breakpoints = {
  320: {
    slidesPerView: 2,
    spaceBetween: 20
  },
  768: {
    slidesPerView: 3,
    spaceBetween: 10
  },
  1024: {
    slidesPerView: 5,
    spaceBetween: 10
  }
}

export default function Home(props) {
  const [current, setCurrent] = useState(props.current)
  const [countries, setCountries] = useState([])
  const [daily, setDaily] = useState(props.daily)

  const debounceSearch = useCallback(
    debounce((value) => {
      getCountry(value)
    }, 500)
  )

  const getWeather = async ([lat, lon]) => {
    await axios
      .get('http://api.openweathermap.org/data/2.5/onecall', {
        params: {
          lat,
          lon,
          exclude: 'minutely,hourly,alerts',
          units: 'metric',
          appid: '016760cc20eb722dc42ed7a483627a9d'
        }
      })
      .then((response) => {
        setCountries([])
        setCurrent(response.data?.current)
        setDaily(response.data?.daily)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const getCountry = async (country) => {
    await axios
      .get(`https://restcountries.eu/rest/v2/name/${country}?`, {
        params: {
          fields: 'name;capital;latlng'
        }
      })
      .then((response) => {
        setCountries(response.data)
      })
      .catch((error) => {
        setCountries([])
      })
  }

  const handleInputSearch = (value) => {
    if (value.length > 2) {
      debounceSearch(value)
    }
  }

  const mapBackground = () => {
    const currentWeather = current.weather[0].main.toLowerCase()

    return weather.includes(currentWeather) ? currentWeather : 'mist'
  }

  return (
    <>
      <Head></Head>
      <div
        className="relative w-full h-screen bg-cover bg-bottom bg-no-repeat font-body"
        style={{
          backgroundImage: `url('/images/${mapBackground()}.jpg')`,
          backgroundColor: '#000'
        }}>
        <InputSearch
          handleInputSearch={handleInputSearch}
          countries={countries}
          getWeather={getWeather}
        />
        <div className="w-full absolute bottom-0 mb-5">
          <div className="w-11/12 sm:w-5/6 lg:w-3/4 m-auto flex flex-col">
            <div className="w-full sm:w-4/6 lg:w-max flex flex-row bg-black bg-opacity-30 backdrop-filter backdrop-blur-md
            rounded-md text-gray-50 p-2 sm:p-5">
              <div className="flex flex-row items-center">
                <img
                  alt="icon-01d"
                  className="w-2/4 sm:w-3/6 lg:w-full"
                  src={`http://openweathermap.org/img/wn/${current.weather[0].icon}@2x.png`}
                />
                <p className="text-lg sm:text-3xl lg:text-5xl">{`${Math.floor(current.temp)}C°`}</p>
              </div>
              <div className="flex flex-col justify-between ml-1 sm:ml-2 lg:ml-6">
                <p className="text-md sm:text-xl lg:text-4xl">{current.weather[0].main}</p>
                <p className="text-sm sm:text-md lg:text-xl">{current.weather[0].description}</p>
                <p className="text-xs sm:text-sm lg:text-md">{dayjs(current.dt * 1000).format('hh:mm DD MMM YYYY')}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 lg:flex lg:flex-row lg:space-x-2 text-white my-2 ">
              <DetailWeatherItem
                image="hot.gif"
                title="Temp max"
                detail={`${Math.floor(daily[0].temp.max)} C°`}
              />
              <DetailWeatherItem
                image="cold.gif"
                title="Temp min"
                detail={`${Math.floor(daily[0].temp.min)} C°`}
              />
              <DetailWeatherItem
                image="wind.png"
                title="Wind"
                detail={`${current.wind_speed} m/s`}
              />
              <DetailWeatherItem
                image="pressure.png"
                title="Pressure"
                detail={`${current.pressure} mb`}
              />
              <DetailWeatherItem
                image="humidity.png"
                title="Humidity"
                detail={`${current.humidity} %`}
              />
            </div>
          </div>
          <div className="w-11/12 sm:w-5/6 lg:w-3/4 m-auto flex flex-row space-x-2 b-2 overflow-x-auto">
            <Swiper
              grabCursor={true}
              breakpoints={breakpoints}
              navigation={true}
              className="mySwiper">
              {daily.map((item, index) => {
                return (
                  <SwiperSlide key={item.dt}>
                    <WeatherDailyItem item={item} index={index} />
                  </SwiperSlide>
                )
              })}
            </Swiper>
          </div>
        </div>
      </div>
    </>
  )
}

export const getServerSideProps = async () => {
  const { current, daily } = await axios
    .get('http://api.openweathermap.org/data/2.5/onecall', {
      params: {
        lon: 100.71991,
        lat: 13.87719,
        exclude: 'minutely,hourly,alerts',
        units: 'metric',
        appid: '016760cc20eb722dc42ed7a483627a9d'
      }
    })
    .then((response) => response.data)

  return {
    props: {
      current,
      daily
    }
  }
}
