import axios from 'axios'

const api = axios.create({
  timeout: 10000
})

export const petAPI = {
  getCatFact: () => api.get('https://catfact.ninja/fact'),
  getDogImage: () => api.get('https://dog.ceo/api/breeds/image/random'),
  getJoke: () => api.get('https://v2.jokeapi.dev/joke/Any?safe-mode')
}

export default api
