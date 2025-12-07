import axios from 'axios'

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL
})
api.interceptors.request.use((Config) => {
    const token = localStorage.getItem('AUTH_TOKEN')
    if(token){
        Config.headers.Authorization = `Bearer ${token}`
    }
    return Config
})

export default api