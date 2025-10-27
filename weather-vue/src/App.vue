<template>
  <main class="min-h-full bg-gradient-to-b from-sky-50 to-indigo-100 py-10">
    <section class="max-w-3xl mx-auto px-4">
      <header class="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-5">
        <h1 class="text-3xl font-semibold  text-slate-800">Weather</h1>
        <button @click="useMyLocation" class="px-3 py-2 rounded-md bg-sky-600 text-white hover:bg-sky-700">Dùng vị trí của tôi</button>
      </header>
      <div class="flex items-center gap-2 mb-3">
        <input
          v-model.trim="city"
          @input="onCityInput"
          type="text"
          placeholder="Nhập thành phố (vd: Ho Chi Minh, Hanoi)"
          class="flex-1 border rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-sky-500"
        />
        <button @click="load" class="px-3 py-2 border rounded-md bg-white hover:bg-slate-100">Làm mới</button>
      </div>
      <div v-if="loading" class="text-slate-600">Đang tải...</div>
      <div v-else-if="error" class="text-red-600">{{ error }}</div>
      <div v-else-if="data" class="rounded-xl border bg-white p-5 shadow-sm">
        <div class="flex items-start justify-between">
          <div>
            <h2 class="text-2xl font-semibold">{{ data.name }}</h2>
            <p class="text-slate-600 capitalize">{{ data.weather?.[0]?.description }}</p>
          </div>
          <div class="flex items-center gap-2">
            <img v-if="iconUrl" :src="iconUrl" alt="icon" class="w-14 h-14" />
            <span class="text-5xl font-bold">{{ tempRounded }}°C</span>
          </div>
        </div>
        <div class="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3 text-sm text-slate-700">
          <div v-for="info in weatherInfo" :key="info.label" class="rounded-lg bg-slate-50 p-3 border">
            <p class="text-slate-500">{{ info.label }}</p>
            <p class="font-medium">{{ info.value }}</p>
          </div>
        </div>
        <p class="mt-3 text-xs text-slate-500">Cập nhật: {{ new Date().toLocaleTimeString() }}</p>
      </div>
      
      <div v-if="hourly.length" class="mt-6">
        <h3 class="text-lg font-semibold mb-3">Dự báo 24h tới</h3>
        <div class="flex gap-3 overflow-x-auto pb-2">
          <div v-for="h in hourly" :key="h.dt" class="flex-shrink-0 rounded-lg border bg-white p-3 text-center min-w-[100px]">
            <p class="text-sm text-slate-500">{{ formatHour(h.dt) }}</p>
            <img v-if="h.weather?.[0]?.icon" :src="`https://openweathermap.org/img/wn/${h.weather[0].icon}@2x.png`" alt="ic" class="w-10 h-10 mx-auto" />
            <p class="text-lg font-medium">{{ Math.round(h.main.temp) }}°C</p>
            <p class="text-xs text-slate-600 capitalize">{{ h.weather?.[0]?.description }}</p>
          </div>
        </div>
      </div>
      <p class="mt-6 text-xs text-slate-600">
        Dữ liệu: OpenWeatherMap. API key được cấu hình qua biến môi trường VITE_WEATHER_KEY.
      </p>
    </section>
  </main>
</template>
<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { getWeatherByCity, getWeatherByCoords, getDailyByCoords } from './services/weather'
const city = ref('Ho Chi Minh')
const data = ref(null)
const hourly = ref([])
const loading = ref(false)
const error = ref('')
let debounceId = null

const tempRounded = computed(() => data.value ? Math.round(data.value.main.temp) : '')

// Helper functions
const getWindSpeed = (speed) => `${Math.round(speed * 3.6)} km/h`

const iconUrl = computed(() => {
  const code = data.value?.weather?.[0]?.icon
  return code ? `https://openweathermap.org/img/wn/${code}@2x.png` : ''
})

const weatherInfo = computed(() => [
  { label: 'Độ ẩm', value: `${data.value?.main.humidity}%` },
  { label: 'Gió', value: getWindSpeed(data.value?.wind?.speed) },
  { label: 'Khả năng mưa', value: `${data.value?.clouds?.all ?? 0}%` },
  { label: 'Cảm nhận như', value: `${Math.round(data.value?.main.feels_like)}°C` }
])

async function fetchWeatherData(query) {
  loading.value = true
  error.value = ''
  try {
    let current
    if (query.city) {
      current = await getWeatherByCity(query.city)
    } else if (query.coords) {
      const { latitude, longitude } = query.coords
      current = await getWeatherByCoords(latitude, longitude)
    } else {
      return
    }
    data.value = current
    city.value = current.name || city.value
    
    // Lấy dự báo 24h tới (Forecast API, mỗi 3h)
    const forecastData = await getDailyByCoords(current.coord.lat, current.coord.lon)
    hourly.value = forecastData.list.slice(0, 8)
  } catch (e) {
    error.value = e?.message || 'Không lấy được dữ liệu'
  } finally {
    loading.value = false
  }
}
function load() {
  if (!city.value) return
  fetchWeatherData({ city: city.value })
}
function onCityInput() {
  clearTimeout(debounceId)
  debounceId = setTimeout(load, 400)
}

function useMyLocation() {
  if (!('geolocation' in navigator)) {
    error.value = 'Trình duyệt không hỗ trợ geolocation'
    return
  }
  navigator.geolocation.getCurrentPosition(
    (pos) => {
      fetchWeatherData({ coords: pos.coords })
    },
    (err) => {
      error.value = err?.message || 'Không thể lấy vị trí'
    }
  )
}
function formatHour(timestamp) {
  const d = new Date(timestamp * 1000)
  return d.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit', hour12: false })
}

onMounted(() => { load() })
onUnmounted(() => { clearTimeout(debounceId) })


</script>
