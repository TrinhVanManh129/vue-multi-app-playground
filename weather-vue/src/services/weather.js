// src/services/weather.js
import axios from 'axios'

const BASE = 'https://api.openweathermap.org/data/2.5'
const KEY = import.meta.env.VITE_WEATHER_KEY

const weatherApi = axios.create({
  baseURL: BASE,
  timeout: 10000
})



async function fetchJson(url, config = {}) {
  try {
    const response = await weatherApi.get(url, config)
    return response.data
  } catch (error) {
    let msg = 'Không lấy được dữ liệu thời tiết'
    if (error.response?.data?.message) {
      msg = `Lỗi: ${error.response.data.message}`
    }
    throw new Error(msg)
  }
}

export async function getWeatherByCity(city, units = 'metric', lang = 'vi') {
  return fetchJson('/weather', {
    params: {
      q: city,
      appid: KEY,
      units,
      lang
    }
  })
}

export async function getWeatherByCoords(lat, lon, units = 'metric', lang = 'vi') {
  return fetchJson('/weather', {
    params: {
      lat,
      lon,
      appid: KEY,
      units,
      lang
    }
  })
}



export async function getDailyByCoords(lat, lon, units = 'metric', lang = 'vi') {
  return fetchJson('/forecast', {
    params: {
      lat,
      lon,
      appid: KEY,
      units,
      lang,
      cnt: 40
    }
  })
}
